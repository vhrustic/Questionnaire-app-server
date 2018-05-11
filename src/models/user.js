/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    role: DataTypes.STRING,
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  // class methods
  User.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
  };
  // instance methods
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
    return this.hashPassword(userInstance.password).then((hashedPassword) => {
      userInstance.password = hashedPassword;
    }).catch(err => sequelize.Promise.reject(err));
  });
  return User;
};

export default user;
