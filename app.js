/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
// const { cors } = require('./middlewares/cors');
const { limiter } = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = require('./utils/config');
const { MESSAGE_BADURL } = require('./utils/errorConstants');

const app = express();

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');

mongoose.connect(DB_URL);

app.use(express.json());
app.use(helmet());

// подключаем rate-limiter
app.use(limiter);

app.use(cookieParser());
// app.use(cors);
app.use(
  cors({
    origin: [
      'http://movies.jul.nomoreparties.co',
      'https://movies.jul.nomoreparties.co',
      'http://localhost:3000',
      'http://localhost:3001',
      // 'https://api.movies.jul.nomoreparties.co',
      // 'https://localhost:3000',
      // 'https://localhost:3001',
      // 'http://api.movies.jul.nomoreparties.co',
    ],
    credentials: true,
  }),
);
app.use(requestLogger); // подключаем логгер запросов

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoundError(MESSAGE_BADURL));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
