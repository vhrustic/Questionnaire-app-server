/* eslint-disable no-param-reassign */

const page = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {});
  Page.associate = function (models) {
    Page.belongsTo(models.Questionnaire, {foreignKey: 'questionnaireId'});
  };
  return Page;
};

export default page;
