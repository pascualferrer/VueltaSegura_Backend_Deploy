'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Cliente, {
        foreignKey: 'clienteID'
      });

      this.belongsTo(models.Servicio, {
        foreignKey: 'servicioID'
      });
    }
  }
  Pago.init({
    clienteID: DataTypes.INTEGER,
    servicioID: DataTypes.INTEGER,
    monto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pago'
  });
  return Pago;
};
