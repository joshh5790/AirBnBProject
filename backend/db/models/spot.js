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
        Model.Review,
        { foreignKey: 'spotId', onDelete: 'Cascade', hooks: true }
      ),
      Spot.belongsTo(
        Model.User,
        { foreignKey: 'ownerId' }
        ),
      Spot.hasMany(
        Model.Booking,
        { foreignKey: 'spotId', onDelete: 'Cascade', hooks: true }
      ),
      Spot.hasOne(
        Model.spotImage,
        { foreignKey: 'spotId', onDelete: 'Cascade', hooks: true }
      )
      }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
