'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slide.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter image's url" },
        isUrl: true,
        validImgFormat(url) {
          if (!(url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg'))) {
            throw new Error('The image url field should be in a valid format. e.g: jpg, png or jpeg');
          }
        }
      }
    },
    text: {
      type: DataTypes.STRING
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Please enter slide's order" }
      }
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Please select the slide's organization" }
      }
    },
  }, {
    sequelize,
    modelName: 'Slide',
    timestamps: false
  });
  return Slide;
};