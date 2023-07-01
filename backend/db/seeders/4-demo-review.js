'use strict';
const { User, Spot } = require('../models');
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const reviews = [
  {
    userId: 2,
    spotId: 1,
    review: "kachow",
    stars: 5
  },
  {
    userId: 3,
    spotId: 2,
    review: "kchow",
    stars: 4
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const reviewInfo of reviews) {
        const { review, stars } = reviewInfo
        const user = await User.findByPk(reviewInfo.userId)
        const spot = await Spot.findByPk(reviewInfo.spotId)
        await Review.create({
          spotId: spot.id,
          userId: user.id,
          review, stars
        })
      }
    } catch(err) {
      console.error(err)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {
      id: {
        [Sequelize.Op.in]: [2,3]
      }
    })
  }
};
