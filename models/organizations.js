'use strict';

/* Organization model for DB */

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Organization.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        address: DataTypes.STRING,
        welcomeText: DataTypes.STRING,
        deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Organization',
    paranoid: true
  });
  return Organization;
};
