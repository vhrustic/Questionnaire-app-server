/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 50],
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [4, 50],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false,
    },
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
  User.prototype.view = function () {
    return {
      fullName: this.fullName,
      email: this.email,
      role: this.role || 'user',
    };
  };
  // hooks
  User.hook('beforeCreate', function (userInstance) {
    return this.hashPassword(userInstance.password).then((hashedPassword) => {
      userInstance.password = hashedPassword;
    }).catch(err => sequelize.Promise.reject(err));
  });
  return User;
};

export default user;
