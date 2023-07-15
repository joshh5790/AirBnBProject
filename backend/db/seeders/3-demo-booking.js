'use strict';
const { User, Spot, Booking } = require('../models');
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const bookings = [
  {
    spotId: 1,
    userId: 2,
    startDate: '08/08/2025',
    endDate: '08/09/2025'
  },
  {
    spotId: 2,
    userId: 3,
    startDate: '08/10/2025',
    endDate: '08/11/2025'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const bookingInfo of bookings) {
        const { startDate, endDate } = bookingInfo
        const user = await User.findByPk(bookingInfo.userId)
        const spot = await Spot.findByPk(bookingInfo.spotId)
        await Booking.create({
          spotId: spot.id,
          userId: user.id,
          startDate, endDate
        })
      }
    } catch(err) {
      console.error(err)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, {
      id: {
        [Sequelize.Op.in]: [1,2]
      }
    })
  }
};
