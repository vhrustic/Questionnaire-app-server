module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    fullName: 'Admin Superuser',
    email: 'admin@example.com',
    role: 'admin',
    password: '$2a$10$B/Cs945X3wfNLpQw8f4HbODIcMdzHb2IXDxOnFYV9luoimvV9ysm.',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => {
  },
};
