'use strict';

const { defaultConfiguration } = require('../../app');
const { sequelize } = require('../models');

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'Cascade',
        allowNull: false
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          key: 'id'
        },
        onDelete: 'Cascade',
        allowNull: false
      },
      review: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId', 'spotId'],
      type: 'unique',
      name: 'unique_user_review'
    }, options)
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews"
    await queryInterface.dropTable(options);
  }
};
