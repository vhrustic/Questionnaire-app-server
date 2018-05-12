module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Options', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    text: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    questionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Questions', key: 'id' },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Options'),
};
