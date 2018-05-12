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
  };
  return Option;
};

export default option;
