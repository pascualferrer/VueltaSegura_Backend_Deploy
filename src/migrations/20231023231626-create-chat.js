'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
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
      adminID: {
        type: Sequelize.INTEGER,
        references: { model: 'Admins', key: 'id'}
      },
      mensaje: {
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
    await queryInterface.dropTable('Chats');
  }
};