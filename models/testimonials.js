'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonials.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Please enter image's url" },
          isUrl: true,
          validImgFormat(url) {
            if (
              !(
                url.endsWith('.jpg') ||
                url.endsWith('.png') ||
                url.endsWith('.jpeg')
              )
            ) {
              throw new Error(
                'The image url field should be in a valid format. e.g: jpg, png or jpeg'
              );
            }
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Testimonials',
    }
  );
  return Testimonials;
};
