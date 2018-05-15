# Questionnaire application server project

Server side application for [Questionnaire application](https://github.com/vhrustic/Questionnaire-app-client). Project is developed using NodeJs with ExpressJs.
User authentication is enabled using either standard credentials or Facebook login. All authorization is done using JWT token.

### Running project
Before you run project, make sure that database credentials are same as in `config/config.js` file. Check database hostname, user credentials and database schema. If you don't have schema specified in `config.js` file, you'll need to create it.

* Run `npm run dev` to start project in development mode. This will automatically run Sequelize migrations.
* From project directory run `node node_modules/sequelize-cli/lib/sequelize db:seed:all` to populate database with default users.
* Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

#### Test it live
Questionnaire application is available [https://questionnaire-app-server.herokuapp.com/](online).
