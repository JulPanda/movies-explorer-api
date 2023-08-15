/* eslint-disable no-console */
const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser, logOut } = require('../controllers/users');
const { signupValidate, loginValidate } = require('../middlewares/validation');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signin', loginValidate, login);
router.post('/signup', signupValidate, createUser);
router.post('/signout', logOut);

router.use(auth);

router.post('/signout', logOut);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

module.exports = router;
