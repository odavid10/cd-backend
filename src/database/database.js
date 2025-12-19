const { Client } = require("pg");

const {
  USER_BD_POSTGRES,
  PASSWORD_BD_POSTGRES,
  HOST_BD_POSTGRES,
  PORT_BD_POSTGRES,
  BD_POSTGRES,
} = require("../environment/envrionment");

class PgService {
  pgClient = new Client({
    user: USER_BD_POSTGRES,
    password: PASSWORD_BD_POSTGRES,
    host: HOST_BD_POSTGRES,
    port: PORT_BD_POSTGRES,
    database: BD_POSTGRES,
  });

  constructor() {
    this.connect();
  }

  async connect() {
    await this.pgClient.connect();
    return this.pgClient;
  }

  async query(query, params) {
    return await this.pgClient.query(query, params);
  }
}

const pgService = new PgService({
  host: process.env.DB_SSH_HOST,
  port: process.env.DB_SSH_PORT,
  username: process.env.DB_SSH_USER,
  password: process.env.DB_SSH_PASS,
});

module.exports = {
  pgService,
};
