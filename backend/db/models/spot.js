'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'Cascade', hooks: true }
      ),
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId', as: "Owner" }
        ),
      Spot.belongsToMany(
        models.User,
        {
          through: models.Booking,
          foreignKey: 'spotId',
          otherKey: 'userId'
        }
      ),
      Spot.hasMany(
        models.SpotImage,
        { foreignKey: 'spotId', onDelete: 'Cascade', hooks: true }
      )
      }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,49]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0,1000],
        checkLen(value) {
          if (value.length > 1000) throw new Error('Description cannot exceed 1000 characters')
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    previewImage: DataTypes.STRING,
    numReviews: DataTypes.INTEGER,
    avgRating: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
