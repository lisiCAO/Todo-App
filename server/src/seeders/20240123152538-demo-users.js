'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('password', saltRounds);
    return queryInterface.bulkInsert('users', [{
      email: 'demo@example.com',
      password: hashedPassword,
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
