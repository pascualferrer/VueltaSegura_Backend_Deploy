'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluacion extends Model {
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
    }
  }
  Evaluacion.init({
    clienteID: DataTypes.INTEGER,
    choferID: DataTypes.INTEGER,
    comentario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    calificacion: {
      type: DataTypes.INTEGER,
      max: 5,
      min: 0
    }
  }, {
    sequelize,
    modelName: 'Evaluacion'
  });
  return Evaluacion;
};
