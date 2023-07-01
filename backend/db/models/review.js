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
        models.ReviewImage,
        { foreignKey: 'reviewId', onDelete: 'Cascade', hooks: true }
      ),
      Review.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      ),
      Review.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      validate: {
        len: [0,1000],
        checkLen(value) {
          if (value.length > 1000) throw new Error('Review cannot exceed 1000 characters')
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
