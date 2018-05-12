/* eslint-disable no-param-reassign */

const answer = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Answer.associate = function (models) {
    Answer.belongsTo(models.Option, {foreignKey: 'optionId'});
    Answer.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Answer;
};

export default answer;
