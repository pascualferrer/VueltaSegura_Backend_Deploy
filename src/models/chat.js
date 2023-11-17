'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Cliente, {
        foreignKey: 'clienteID'
      });

      this.belongsTo(models.Chofer, {
        foreignKey: 'choferID'
      });

      this.belongsTo(models.Admin, {
        foreignKey: 'adminID'
      });
    }
  }
  Chat.init({
    clienteID: DataTypes.INTEGER,
    choferID: DataTypes.INTEGER,
    adminID: DataTypes.INTEGER,
    mensaje: {
      type: DataTypes.STRING,
      min: 1,
      max: 200
    }
  }, {
    sequelize,
    modelName: 'Chat'
  });
  return Chat;
};
