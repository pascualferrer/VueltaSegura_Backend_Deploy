'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cliente, {
        foreignKey: 'clienteID',
      });

      this.belongsTo(models.Chofer, {
        foreignKey: 'choferID',
      });

      this.hasOne(models.Servicio, {
        foreignKey: 'id',
      })
    }
  }
  Servicio.init({
    clienteID: DataTypes.INTEGER,
    choferID: DataTypes.INTEGER,
    precio: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    hora: DataTypes.TIME,
    fecha: DataTypes.DATE,
    estado: DataTypes.STRING,
    origen: DataTypes.STRING,
    destino: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Servicio',
  });
  return Servicio;
};



