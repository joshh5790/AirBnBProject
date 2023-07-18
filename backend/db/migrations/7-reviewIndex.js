'use strict';

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex(
      { tableName: "Reviews", schema: options.schema },
      ["spotId", "userId"],
      {
        unique: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      { tableName: "Reviews", schema: options.schema },
      ["spotId", "userId"]
    )
  }
};
