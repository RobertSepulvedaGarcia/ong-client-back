'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {as: 'role'});
    }
  };
  User.init({
    firstName: { 
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notNull: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z]+$/i,
        notNull: true
      }
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true,
        notNull: true
      }
    },
    image: {
      type: DataTypes.STRING,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
    },
    deletedAt:{ 
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};