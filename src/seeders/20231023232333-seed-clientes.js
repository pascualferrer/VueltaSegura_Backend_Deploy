module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Clientes', [
    {
      nombre: 'Marcelino Nuñez',
      email: 'marcelindo@uc.cl',
      contrasena: 'paraquetetraje',
      telefono: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Sextor',
      email: 'htenoric@uc.cl',
      contrasena: 'honestamente',
      telefono: '987654321',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Clientes', null, {})
};
