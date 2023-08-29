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
    name: 'Tranquil Lakeside Retreat',
    description: 'Escape to a serene lakeside haven where tranquility meets modern comfort. This picturesque cabin boasts panoramic views of the shimmering lake from every room. Unwind on the private deck, listen to the gentle lapping of water, and relish in the beauty of nature. With its cozy fireplace and contemporary amenities, this retreat is perfect for a romantic getaway or a peaceful solo adventure.',
    price: '1000',
    previewImage: 'https://img.freepik.com/premium-photo/photo-hyper-detailed-shot-tranquil-lakeside-retreat_933496-19002.jpg'
  },
  {
    ownerId: 2,
    address: '1235 Bi Bi',
    city: 'Gilroy',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'Charming Urban Oasis',
    description: 'Step into an urban oasis tucked away in the heart of the city. This charming two-story house combines vintage elegance with modern flair. Lounge in the lush garden courtyard surrounded by fragrant flowers and twinkling fairy lights. Just minutes away from bustling cafes, art galleries, and cultural hotspots, this home offers a perfect blend of convenience and relaxation.',
    price: '1000',
    previewImage: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2021/1/15/0/Handmade-Home-Tour_Danielle-Boaz_Exterior-After-1.jpg'
  },
  {
    ownerId: 3,
    address: '1235 Disney',
    city: 'Gilroy',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'Luxurious Mountain Lodge',
    description: "Indulge in the lap of luxury at this magnificent mountain lodge. Boasting cathedral ceilings, floor-to-ceiling windows, and stunning panoramic mountain views, this retreat is a true masterpiece. Pamper yourself in the private sauna, unwind by the grand fireplace, or stargaze from the outdoor hot tub. Whether you're an avid adventurer or seeking a lavish escape, this lodge promises an unforgettable experience.",
    price: '1000',
    previewImage: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/6/12/1/DOTY2019_FH-Architects_High-Times_005.jpg'
  },
  {
    ownerId: 3,
    address: '1235 Disney',
    city: 'Campbell',
    state: 'CA',
    country: 'US',
    lat: '20.5',
    lng: '20.5',
    name: 'Secluded Treehouse Haven',
    description: "Fulfill your childhood dreams with a stay in this enchanting treehouse. Nestled among ancient oaks and connected by rustic rope bridges, this whimsical abode offers a unique blend of comfort and nature. Wake up to the melody of songbirds, sip your morning coffee on the suspended deck, and let the rustling leaves lull you into a peaceful slumber. This is more than a getaway; it's an invitation to reconnect with your inner explorer.",
    price: '1000',
    previewImage: 'https://www.refinery29.com/images/11082901.jpg'
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
                name, description, price, previewImage
              } = spotInfo
        const owner = await User.findByPk(spotInfo.ownerId)
        await Spot.create({
          ownerId: owner.id,
          address, city, state,
          country, lat, lng,
          name, description, price, previewImage
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
