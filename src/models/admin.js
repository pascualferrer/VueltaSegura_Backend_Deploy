'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: 'id',
      });
    }
  }
  Admin.init({
    nombre: {
      type: DataTypes.STRING,
    },
    contrasena: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)) {
            throw new Error('La contraseña debe tener al menos un número, una letra y un caracter especial')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email no válido'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};