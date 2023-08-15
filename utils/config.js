const {
  PORT = 3000,
  NODE_ENV,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  NODE_ENV,
  DB_URL,
  JWT_SECRET,
};
