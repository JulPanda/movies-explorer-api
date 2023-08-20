const { ERROR_CONFLICT } = require('../utils/errorConstants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
