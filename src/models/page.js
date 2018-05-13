/* eslint-disable no-param-reassign */

const page = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {});
  Page.associate = function (models) {
    Page.belongsTo(models.Questionnaire, {foreignKey: 'questionnaireId'});
    Page.hasMany(models.Question,{as: 'questions'});
  };
  return Page;
};

export default page;
