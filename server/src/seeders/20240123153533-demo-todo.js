'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    const userId = 1; // Assuming the user ID is 1

    await queryInterface.bulkInsert('todos', [
      {
        ownerId: userId,
        task: 'Complete task 1',
        dueDate: new Date(),
        isDone: 0
      },
      {
        ownerId: userId,
        task: 'Complete task 2',
        dueDate: new Date(),
        isDone: 0
      },
      // Add more todo items here
    ], { timestamps: true });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('todos', null, {});
  }
};
