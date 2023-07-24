'use strict';

const { User, Spot } = require('../models');
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

const spots = [
  {
    ownerId: 1,
    address: '1234 Hi Hi',
    city: 'Saratoga',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'moldy basement',
    description: 'lots of mold',
    price: '1000'
  },
  {
    ownerId: 2,
    address: '1235 Bi Bi',
    city: 'Gilroy',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'moldier basement',
    description: 'even more mold',
    price: '1000'
  },
  {
    ownerId: 3,
    address: '1235 Disney',
    city: 'Gilroy',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'pain',
    description: 'even more mold',
    price: '1000'
  },
  {
    ownerId: 3,
    address: '1235 Disney',
    city: 'Campbell',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'pain',
    description: 'even more mold',
    price: '1000'
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const spotInfo of spots) {
        const {
                address, city, state,
                country, lat, lng,
                name, description, price
              } = spotInfo
        const owner = await User.findByPk(spotInfo.ownerId)
        await Spot.create({
          ownerId: owner.id,
          address, city, state,
          country, lat, lng,
          name, description, price
        })
      }
    } catch(err) {
      console.error(err)
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, {
      address: {
        [Sequelize.Op.in]: ['1234 Hi Hi', '1235 Bi Bi']
      }
    })
  }
};
