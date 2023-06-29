'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reviewImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reviewImages.init({
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN,
    reviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reviewImages',
  });
  return reviewImages;
};