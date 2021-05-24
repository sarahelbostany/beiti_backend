'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class individual_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.individual_image.belongsTo(models.user)
      models.individual_image.belongsTo(models.image)
    }
  };
  individual_image.init({
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'individual_image',
  });
  return individual_image;
};
