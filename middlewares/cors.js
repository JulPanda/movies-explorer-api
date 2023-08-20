// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://api.movies.jul.nomoreparties.co',
  'http://api.movies.jul.nomoreparties.co',
  'https://movies.jul.nomoreparties.co',
  'http://movies.jul.nomoreparties.co',
  // 'http://localhost:3001',
  'https://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = { cors };
