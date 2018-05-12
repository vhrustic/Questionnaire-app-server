/* eslint-disable no-param-reassign */

const questionnaire = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 150],
      },
      allowNull: false,
    },
  });
  Questionnaire.associate = function (models) {
    Questionnaire.belongsTo(models.User, { foreignKey: 'createdBy' });
  };
  return Questionnaire;
};

export default questionnaire;
