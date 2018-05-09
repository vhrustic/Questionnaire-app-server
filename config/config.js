/*/* eslint-disable no-unused-vars */
import path from 'path';
import dotenv from 'dotenv-safe';


/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example'),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 3001,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'articles',
    options: {
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  },
  development: {
    username: 'questionnaire',
    password: 'jk$7vF$Y%6jNsH6J',
    database: 'questionnaire_db',
    options: {
      host: 'localhost',
      dialect: 'mysql',
    },
  },
  production: {
    username: 'root',
    password:
      'root',
    database:
      'articles',
    options: {
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    ip: process.env.IP || undefined,
    port: process.env.PORT || 3001,
  },
};

module.exports = Object.assign(config.all, config[config.all.env]);
export default module.exports;
