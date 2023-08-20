const STATUS_OK = 200;
const STATUS_CREATED = 201;

const regexLink = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = { STATUS_OK, STATUS_CREATED, regexLink };
