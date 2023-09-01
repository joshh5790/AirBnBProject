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
  {
    ownerId: 2,
    address: '456 Cabin Way',
    city: 'Aspen',
    state: 'CO',
    country: 'US',
    lat: '39.2',
    lng: '-106.8',
    name: 'Rustic Mountain Cabin',
    description: 'Experience the charm of a rustic mountain cabin nestled in the heart of the Rockies. Cozy up by the crackling fireplace, soak in the outdoor hot tub, and revel in the breathtaking views of snow-capped peaks.',
    price: '800',
    previewImage: 'https://cdn.onekindesign.com/wp-content/uploads/2018/11/Rustic-Mountain-Cabin-Walton-Architecture-01-1-Kindesign.jpg'
  },
  {
    ownerId: 3,
    address: '789 Shoreline Avenue',
    city: 'Beachside',
    state: 'FL',
    country: 'US',
    lat: '27.1',
    lng: '-80.2',
    name: 'Seaside Cottage Getaway',
    description: 'Immerse yourself in the tranquil sounds of the waves at this charming seaside cottage. Walk along the sandy shore, enjoy breathtaking sunsets from the deck, and create lasting memories in this coastal haven.',
    price: '1200',
    previewImage: 'https://lonestarsouthern.com/wp-content/uploads/2021/05/SeasideFlBeachfrontCottage3-4-1200x800.jpg'
  },
  {
    ownerId: 4,
    address: '123 Loft Street',
    city: 'Metropolis',
    state: 'NY',
    country: 'US',
    lat: '40.7',
    lng: '-74.0',
    name: 'Urban Chic Loft',
    description: 'Experience the vibrant energy of the city in this stylish loft. With sleek modern design, floor-to-ceiling windows, and easy access to cultural hotspots, this urban retreat offers the best of city living.',
    price: '1500',
    previewImage: 'https://i.ytimg.com/vi/OOJ8HuaOwuQ/maxresdefault.jpg'
  },
  {
    ownerId: 5,
    address: '567 Meadow Lane',
    city: 'Tranquilville',
    state: 'CA',
    country: 'US',
    lat: '35.3',
    lng: '-120.7',
    name: 'Serene Countryside Villa',
    description: 'Escape to a serene countryside villa surrounded by rolling hills and lush gardens. Relax by the pool, enjoy al fresco dining under the stars, and experience the peace and beauty of rural living.',
    price: '1100',
    previewImage: 'https://luxuo-com-production.s3.ap-southeast-1.amazonaws.com/2016/06/2-36-660x532.jpg'
  },
  {
    ownerId: 6,
    address: '789 Lakeview Drive',
    city: 'Lakewood',
    state: 'CO',
    country: 'US',
    lat: '39.6',
    lng: '-105.0',
    name: 'Cozy Lakeside Cabin',
    description: 'Find comfort in this charming lakeside cabin. Fish off the private dock, take leisurely canoe rides, and enjoy evenings by the campfire, sharing stories under the starlit sky.',
    price: '900',
    previewImage: 'https://cdn.onekindesign.com/wp-content/uploads/2016/12/Cozy-Lake-House-Pritchett-Dixon-01-1-Kindesign.jpg'
  },
  {
    ownerId: 7,
    address: '456 Historic Street',
    city: 'Heritageville',
    state: 'MA',
    country: 'US',
    lat: '42.3',
    lng: '-71.1',
    name: 'Historic Downtown Apartment',
    description: 'Step back in time with a stay in this charming historic apartment. Located in the heart of the city, it offers a glimpse into the past while providing modern comforts and easy access to cultural attractions.',
    price: '950',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-4KoVSnVtp5adIh2.png'
  },
  {
    ownerId: 9,
    address: '789 Palm Avenue',
    city: 'Island Paradise',
    state: 'HI',
    country: 'US',
    lat: '21.3',
    lng: '-157.8',
    name: 'Tropical Paradise Villa',
    description: 'Escape to a lush tropical paradise where palm trees sway in the breeze and turquoise waters beckon. This exquisite villa offers luxury, privacy, and an unforgettable island experience.',
    price: '1800',
    previewImage: 'https://media-cdn.tripadvisor.com/media/vr-splice-j/05/62/4c/35.jpg'
  },
  {
    ownerId: 1,
    address: '123 Oceanfront Drive',
    city: 'Malibu',
    state: 'CA',
    country: 'US',
    lat: '34.0',
    lng: '-118.8',
    name: 'Luxury Beachfront Villa',
    description: 'Stay in a luxurious beachfront villa with stunning ocean views. Enjoy private access to the beach, a spacious deck, and a gourmet kitchen.',
    price: '1200',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-Ag47S37EdsqAHyZ.png'
  },
  {
    ownerId: 3,
    address: '789 Mountain Retreat Road',
    city: 'Breckenridge',
    state: 'CO',
    country: 'US',
    lat: '39.5',
    lng: '-106.0',
    name: 'Mountain Chalet Getaway',
    description: 'Escape to a cozy mountain chalet surrounded by nature. Hike the nearby trails, relax by the fireplace, and soak in the mountain views.',
    price: '600',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-mjKyHYTj8VBfCZt.png'
  },
  {
    ownerId: 4,
    address: '101 Lakeside Cottage Lane',
    city: 'Lake Tahoe',
    state: 'CA',
    country: 'US',
    lat: '39.1',
    lng: '-120.0',
    name: 'Lakeside Cottage Retreat',
    description: 'Experience the serenity of a lakeside cottage. Fish, kayak, or simply unwind on the deck with panoramic lake views.',
    price: '950',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-3V6POI3p3yRPNrH.png'
  },
  {
    ownerId: 2,
    address: '456 Cabin Way',
    city: 'Aspen',
    state: 'CO',
    country: 'US',
    lat: '39.2',
    lng: '-106.8',
    name: 'Rustic Mountain Cabin',
    description: 'Experience the charm of a rustic mountain cabin nestled in the heart of the Rockies. Cozy up by the crackling fireplace, soak in the outdoor hot tub, and revel in the breathtaking views of snow-capped peaks.',
    price: '800',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-dLARPhOpOo1SyuZ.png'
  },
  {
    ownerId: 5,
    address: '567 Lakeside Retreat',
    city: 'Lake Tahoe',
    state: 'CA',
    country: 'US',
    lat: '39.1',
    lng: '-120.0',
    name: 'Lakeside Tranquility',
    description: 'Discover serenity at this Lakeside Tahoe retreat. Enjoy kayaking on the lake, hiking in the nearby forests, and stargazing by the fire pit.',
    price: '1000',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-OXC2yHfls4SvHAA.png'
  },
  {
    ownerId: 6,
    address: '321 City Loft',
    city: 'New York City',
    state: 'NY',
    country: 'US',
    lat: '40.7',
    lng: '-74.0',
    name: 'Chic City Loft',
    description: 'Experience the vibrant energy of New York City from this chic loft. Explore world-class dining, theater, and nightlife, all just steps away.',
    price: '1600',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-lMe7jtXubl14zhK.png'
  },
  {
    ownerId: 7,
    address: '456 Beach Bungalow',
    city: 'Santa Monica',
    state: 'CA',
    country: 'US',
    lat: '34.0',
    lng: '-118.5',
    name: 'Beachfront Bungalow',
    description: 'Live the beachfront dream in this Santa Monica bungalow. Wake up to the sound of the waves, surf, or relax on the sandy shores.',
    price: '1100',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-Ag47S37EdsqAHyZ.png'
  },
  {
    ownerId: 8,
    address: '789 Cabin Retreat',
    city: 'Jackson Hole',
    state: 'WY',
    country: 'US',
    lat: '43.5',
    lng: '-110.7',
    name: 'Secluded Cabin Getaway',
    description: 'Escape to the wild beauty of Jackson Hole in this secluded cabin. Explore national parks, go wildlife watching, and unwind by the fireplace.',
    price: '900',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-mjKyHYTj8VBfCZt.png'
  },
  {
    ownerId: 9,
    address: '123 Desert Oasis',
    city: 'Scottsdale',
    state: 'AZ',
    country: 'US',
    lat: '33.5',
    lng: '-111.9',
    name: 'Luxury Desert Villa',
    description: 'Experience luxury in the Arizona desert. Enjoy golf, spa treatments, and spectacular sunsets from this lavish Scottsdale villa.',
    price: '1300',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-QGGVQIEzAuCzj8p.png'
  },
  {
    ownerId: 8,
    address: '567 Vineyard Cottage',
    city: 'Napa Valley',
    state: 'CA',
    country: 'US',
    lat: '38.5',
    lng: '-122.3',
    name: 'Vineyard Cottage Retreat',
    description: 'Escape to wine country in this charming Napa Valley cottage. Explore vineyards, savor wine tastings, and relax in the picturesque surroundings.',
    price: '950',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-BSabqOoX7nozXxB.png'
  },
  {
    ownerId: 7,
    address: '789 Lakeview Cabin',
    city: 'Lake Placid',
    state: 'NY',
    country: 'US',
    lat: '44.3',
    lng: '-73.9',
    name: 'Lakeview Cabin Hideaway',
    description: 'Experience a cozy cabin retreat in Lake Placid. Enjoy boating on the lake, hiking in the Adirondacks, and evenings by the campfire.',
    price: '850',
    previewImage: 'https://hotpotmedia.s3.us-east-2.amazonaws.com/8-3V6POI3p3yRPNrH.png'
  }
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
