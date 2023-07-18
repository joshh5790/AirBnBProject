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
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      preview: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Reviews',
          key: 'id'
        },
        onDelete: 'Cascade',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages"
    await queryInterface.dropTable(options);
  }
};
