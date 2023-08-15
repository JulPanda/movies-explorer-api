const router = require('express').Router();

const { createMovie, getMovies, deleteMovieById } = require('../controllers/movies');

const { movieValidate, movieIdValidate } = require('../middlewares/validation');

router.post('/', movieValidate, createMovie);
router.get('/', getMovies);
router.delete('/:id', movieIdValidate, deleteMovieById);

module.exports = router;
