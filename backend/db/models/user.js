'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(
        models.Review,
        { foreignKey: 'userId', onDelete: 'Cascade', hooks: true }
      ),
      User.belongsToMany(
        models.Spot,
        {
          through: models.Booking,
          foreignKey: 'userId',
          otherKey: 'spotId'
        }
      ),
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId', onDelete: 'Cascade', hooks: true }
      )
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4,30],
        checkEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: [
          'hashedPassword',
          'email',
          'updatedAt',
          'createdAt'
        ]
      }
    }
  });
  return User;
};
