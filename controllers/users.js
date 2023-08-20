const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const CastError = require('../errors/incorrectDataError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');
const {
  MESSAGE_INCORRECT_DATA,
  MESSAGE_CONFLICT,
  MESSAGE_NOT_FOUND,
  MESSAGE_INCORRECT_ID,
  MESSAGE_INPUT_DATA,
  MESSAGE_UNAUTHORIZED_DATA,
  MESSAGE_LOGOUT,
} = require('../utils/errorConstants');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        email, password: hashedPassword, name,
      })
        .then((user) => {
          res.status(STATUS_CREATED).send({
            email: user.email,
            name: user.name,
          });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            next(new CastError(MESSAGE_INCORRECT_DATA));
          } else if (err.code === 11000) {
            next(new ConflictError(MESSAGE_CONFLICT));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((users) => {
      res.status(STATUS_OK).send(users);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MESSAGE_NOT_FOUND));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new CastError(MESSAGE_INCORRECT_ID));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MESSAGE_NOT_FOUND));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new CastError(MESSAGE_INCORRECT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE_CONFLICT));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new UnauthorizedError(MESSAGE_INPUT_DATA));
    return;
  }
  User.findOne({ email })
    .select('+password')
    .orFail()
    .then((user) => {
      // console.log(user);
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
          // создать токен
            const jwttoken = jwt.sign({
              _id: user._id,
            }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
            // прикрепить его к куке
            res.cookie('jwttoken', jwttoken, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            });
            res.send(user.toJSON());
          } else {
            next(new UnauthorizedError(MESSAGE_UNAUTHORIZED_DATA));
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new UnauthorizedError(MESSAGE_UNAUTHORIZED_DATA));
      } else {
        next(err);
      }
    });
};

const logOut = (req, res, next) => {
  res.clearCookie('jwttoken').send({ message: MESSAGE_LOGOUT });
  next();
};

module.exports = {
  createUser, updateUser, login, getUser, logOut,
};
