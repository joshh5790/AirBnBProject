'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(
        Model.ReviewImage,
        { foreignKey: 'reviewId', onDelete: 'Cascade', hooks: true }
      ),
      Review.belongsTo(
        Model.User,
        { foreignKey: 'userId' }
      ),
      Review.belongsTo(
        Model.Spot,
        { foreignKey: 'spotId' }
      )
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
