require("dotenv").config();

const environment = {
  port: process.env.PORT,
  USER_BD_POSTGRES: process.env.USER_BD_POSTGRES,
  PASSWORD_BD_POSTGRES: process.env.PASSWORD_BD_POSTGRES,
  HOST_BD_POSTGRES: process.env.HOST_BD_POSTGRES,
  PORT_BD_POSTGRES: process.env.PORT_BD_POSTGRES,
  BD_POSTGRES: process.env.BD_POSTGRES,
};

module.exports = {
  ...environment,
};
