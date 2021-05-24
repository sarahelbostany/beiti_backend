'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    models.image.hasMany(models.individual_image)
    models.image.belongsToMany(models.user, {through:'individual_image'})
    }
  };
  image.init({
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};
