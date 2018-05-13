/* eslint-disable no-param-reassign */

const question = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 250],
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
      allowNull: false,
    },
  });
  Question.associate = function (models) {
    Question.belongsTo(models.Page, {foreignKey: 'pageId'});
    Question.hasMany(models.Option,{as: 'options'});
  };
  return Question;
};

export default question;
