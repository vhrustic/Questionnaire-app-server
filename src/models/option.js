/* eslint-disable no-param-reassign */

const option = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Option.associate = function (models) {
    Option.belongsTo(models.Question, {foreignKey: 'questionId'});
    Option.hasMany(models.Answer, {foreignKey: 'optionId', as: 'answers'});
  };
  return Option;
};

export default option;
