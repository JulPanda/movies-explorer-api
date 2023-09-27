const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const ERROR_INCORRECT_DATA = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_CONFLICT = 409;
const ERROR_FORBIDDEN = 403;

const MESSAGE_INCORRECT_DATA = 'Переданы некорректные данные при создании пользователя';
const MESSAGE_INCORRECT_ID = 'Некорректный id пользователя';
const MESSAGE_CONFLICT = 'Пользователь с таким email уже существует';
const MESSAGE_NOT_FOUND = 'Запрашиваемый пользователь не найден';
const MESSAGE_INPUT_DATA = 'Введите данные';
const MESSAGE_UNAUTHORIZED_DATA = 'Не совпадает email или пароль';
const MESSAGE_LOGOUT = 'Выход';
const MESSAGE_INCORRECT_MOVIE = 'Переданы некорректные данные при создании карточки';
const MESSAGE_FORBIDDEN = 'Нельзя удалять чужой фильм';
const MESSAGE_NOTFOUND_MOVIE = 'Запрашиваемый фильм не найден';
const MESSAGE_UNAUTHORIZID = 'Необходима авторизация';
const MESSAGE_BADURL = 'Запрашиваемый адрес не существует';
const MESSAGE_SERVER = 'Ошибка сервера';

module.exports = {
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  ERROR_INCORRECT_DATA,
  ERROR_UNAUTHORIZED,
  ERROR_CONFLICT,
  ERROR_FORBIDDEN,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_CONFLICT,
  MESSAGE_NOT_FOUND,
  MESSAGE_INCORRECT_ID,
  MESSAGE_INPUT_DATA,
  MESSAGE_UNAUTHORIZED_DATA,
  MESSAGE_LOGOUT,
  MESSAGE_INCORRECT_MOVIE,
  MESSAGE_FORBIDDEN,
  MESSAGE_NOTFOUND_MOVIE,
  MESSAGE_UNAUTHORIZID,
  MESSAGE_BADURL,
  MESSAGE_SERVER,
};
