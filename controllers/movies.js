/* eslint-disable no-console */
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const CastError = require('../errors/incorrectDataError');
const ForbiddenError = require('../errors/forbiddenError');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');
const {
  MESSAGE_INCORRECT_ID,
  MESSAGE_INCORRECT_MOVIE,
  MESSAGE_FORBIDDEN,
  MESSAGE_NOTFOUND_MOVIE,
} = require('../utils/errorConstants');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new CastError(MESSAGE_INCORRECT_MOVIE));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(STATUS_OK).send(movies);
    })
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail()
    .then((movie) => {
      if (String(movie.owner) !== String(req.user._id)) {
        throw next(new ForbiddenError(MESSAGE_FORBIDDEN));
      } else {
        return Movie.deleteOne(movie)
          .then(() => {
            res.status(STATUS_OK).send(movie);
          });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MESSAGE_NOTFOUND_MOVIE));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new CastError(MESSAGE_INCORRECT_ID));
      } else {
        next(err);
      }
    });
};

module.exports = { createMovie, getMovies, deleteMovieById };
