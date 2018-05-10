/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  // instance methods
  User.prototype.hashPassword = function () {
    return bcrypt.hash(this.password, 10);
  };
  User.prototype.authenticate = function (password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword).then((valid) => {
      if (!valid) {
        return null;
      }
      return this;
    });
  };
  // hooks
  User.hook('beforeCreate', (userInstance) => {
    return userInstance.hashPassword().then((hashedPassword) => {
      userInstance.password = hashedPassword;
    }).catch(err => sequelize.Promise.reject(err));
  });
  return User;
};

export default user;
