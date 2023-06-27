'use strict';
const bcrypt = require('bcryptjs');
const { User } = require('../models')
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await User.bulkCreate([
        {
          firstName: 'Bad',
          lastName: 'Mango',
          email: 'demo@user.io',
          username: 'Demo',
          hashedPassword: bcrypt.hashSync('password')
        },
        {
          firstName: 'Dad',
          lastName: 'Mango',
          email: 'user1@user.io',
          username: 'FakeUser1',
          hashedPassword: bcrypt.hashSync('password1')
        },
        {
          firstName: 'Fad',
          lastName: 'Mango',
          email: 'user2@user.io',
          username: 'FakeUser2',
          hashedPassword: bcrypt.hashSync('password2')
        },
      ], options)
    } catch(err) {
      console.error(err)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    *
    * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      username: {
        [Sequelize.Op.in]: ['Demo', 'FakeUser1', 'FakeUser2']
      }
    })
  }
};
