'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Servicios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteID: {
        type: Sequelize.INTEGER,
        references: { model: 'Clientes', key: 'id'}
      },
      choferID: {
        type: Sequelize.INTEGER,
        references: { model: 'Chofers', key: 'id'}
      },
      precio: {
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      hora: {
        type: Sequelize.TIME
      },
      fecha: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING
      },
      origen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destino: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Servicios');
  }
};