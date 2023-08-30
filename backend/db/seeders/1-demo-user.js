'use strict';
const bcrypt = require('bcryptjs');
const { User } = require('../models')
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const users = [
  {
    firstName: 'Braddicus',
    lastName: 'Chaddicus',
    email: 'demo@user.io',
    username: 'Demo',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Chaddicus',
    lastName: 'Braddicus',
    email: 'user1@user.io',
    username: 'Demo1',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Pika',
    lastName: 'Chu',
    email: 'user2@user.io',
    username: 'Demo2',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Charm',
    lastName: 'Ander',
    email: 'user3@user.io',
    username: 'Demo3',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Charm',
    lastName: 'Eleon',
    email: 'user4@user.io',
    username: 'Demo4',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Chari',
    lastName: 'Zard',
    email: 'user5@user.io',
    username: 'Demo5',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Pi',
    lastName: 'Chu',
    email: 'user6@user.io',
    username: 'Demo6',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Rai',
    lastName: 'Chu',
    email: 'user7@user.io',
    username: 'Demo7',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Gira',
    lastName: 'Tina',
    email: 'user8@user.io',
    username: 'Demo8',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Luca',
    lastName: 'Rio',
    email: 'user9@user.io',
    username: 'Demo9',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Rio',
    lastName: 'Lu',
    email: 'user10@user.io',
    username: 'Demo10',
    hashedPassword: bcrypt.hashSync('password')
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await User.bulkCreate(users, options)
    } catch(err) {
      console.error(err)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      username: {
        [Sequelize.Op.in]: ['Demo', 'FakeUser1', 'FakeUser2']
      }
    })
  }
};
