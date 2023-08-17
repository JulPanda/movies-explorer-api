const { ERROR_INCORRECT_DATA } = require('../utils/errorConstants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INCORRECT_DATA;
  }
}

module.exports = CastError;
