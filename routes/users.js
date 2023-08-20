const router = require('express').Router();

const {
  updateUser,
  getUser,
} = require('../controllers/users');

const { userValidate } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', userValidate, updateUser);

module.exports = router;
