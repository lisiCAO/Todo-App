'use strict';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', saltRounds);

    await queryInterface.bulkInsert('users', [{
      email: 'demo@example.com',
      password: hashedPassword,
    }], { timestamps: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
'use strict';
