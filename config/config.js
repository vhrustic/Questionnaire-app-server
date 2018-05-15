/* /* eslint-disable no-unused-vars */
import path from 'path';
import dotenv from 'dotenv-safe';

require('babel-core/register');


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
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    facebook: {
      clientID: '356869268168181',
      clientSecret: '6586e37cf43e97427b179cad686ce78b',
    },
    mailOptions: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mopquestionnairevejsilhrustic@gmail.com',
        pass: 'zWiKCR04cXXtUw9bKgx3smy6mgT',
      },
    },
  },
  test: {
    mysql: {
      username: 'root',
      password: 'root',
      database: 'articles',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  },
  development: {
    clientUrl: 'http://localhost:3000/',
    mysql: {
      username: 'questionnaire',
      password: 'jk$7vF$Y%6jNsH6J',
      database: 'questionnaire_db',
      host: 'localhost',
      port: '3306',
      dialect: 'mysql',
      seedStorage: 'sequelize',
    },
  },
  production: {
    clientUrl: 'https://question-client-app.herokuapp.com/',
    mysql: {
      username: 'b741df4418212a',
      password: 'b38f1fd9',
      database: 'heroku_7a31494077d87cf',
      host: 'us-cdbr-iron-east-04.cleardb.net',
      dialect: 'mysql',
      seedStorage: 'sequelize',
    },
    ip: process.env.IP || undefined,
    port: process.env.PORT || 3001,
  },
};

const configExport = Object.assign(config.all, config[config.all.env]);

export default configExport;
