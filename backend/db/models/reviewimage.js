'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(
        models.Review,
        { foreignKey: 'reviewId' }
      )
    }
  }
  ReviewImage.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    preview: DataTypes.BOOLEAN,
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        maxImgsPerReview() {
          const currVal = this.reviewId
          return ReviewImage.count({
            where: { reviewId: currVal }
          }).then((count) => {
            if (count > 9) throw new Error("Maximum number of images for this resource")
          })
        }
      }
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
