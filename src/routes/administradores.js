const Router = require('koa-router');

const routerAdmins = new Router();

//* Listar todos los administradores (según cápsula)
routerAdmins.get('administradores.list', '/', async (ctx) => {
  try {
    const administradores = await ctx.orm.Admin.findAll();
    ctx.body = administradores;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Obtener un administrador específico (según cápsula)
routerAdmins.get('administradores.show', '/:id', async (ctx) => {
  try {
    const administrador = await ctx.orm.Admin.findByPk(ctx.params.id); //! Busca según Primary Key
    //! Otra forma de hacerlo: const administrador = await ctx.orm.Admin.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
    ctx.body = administrador;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Crear un nuevo administrador (según cápsula)
routerAdmins.post('administradores.create', '/', async (ctx) => {
  try {
    const administrador = await ctx.orm.Admin.create(ctx.request.body);
    ctx.body = administrador;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Actualizar administrador
routerAdmins.put('administradores.update', '/:id', async (ctx) => {
  try {
    const administrador = await ctx.orm.Admin.findByPk(ctx.params.id);

    if (!administrador) {
      ctx.status = 404;
      ctx.body = { error: 'Admin no encontrado' };
      return;
    }

    await administrador.update(ctx.request.body);

    ctx.body = administrador;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

//* Eliminar un administrador
routerAdmins.delete('administradores.delete', '/:id', async (ctx) => {
  try {
    const administrador = await ctx.orm.Admin.findByPk(ctx.params.id);

    if (!administrador) {
      ctx.status = 404;
      ctx.body = { error: 'Admin no encontrado' };
      return;
    }

    await administrador.destroy();

    ctx.body = { message: 'Admin eliminado exitosamente' };
    ctx.status = 204; // Sin contenido (No Content)
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

module.exports = routerAdmins;
