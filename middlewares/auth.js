const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { MESSAGE_UNAUTHORIZID } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwttoken;
  let payload;

  try {
    if (!token) {
      next(new UnauthorizedError(MESSAGE_UNAUTHORIZID));
    } else {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    }
  } catch (err) {
    next(new UnauthorizedError(MESSAGE_UNAUTHORIZID));
  }

  req.user = payload;
  next();
};

module.exports = auth;
