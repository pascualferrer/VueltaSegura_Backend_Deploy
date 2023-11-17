const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');
const routerChoferes = new Router();

//* Obtener un chofer específico para un email
routerChoferes.get('choferes.login', '/buscar-por-email', async (ctx) => {
  try {
    const { email } = ctx.request.query;
    console.log(email);

    // Buscar un usuario por correo electrónico
    const chofer = await ctx.orm.Chofer.findOne({
      where: { email }
    });

    if (!chofer) {
      // Usuario no encontrado
      ctx.body = { error: 'Chofer no encontrado' };
      ctx.status = 404; // Código de estado HTTP 404 Not Found
      return;
    }

    ctx.body = chofer;
    ctx.status = 200; // Código de estado HTTP 200 OK
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
    ctx.body = { error: 'Error al procesar la solicitud' };
    ctx.status = 500; // Código de estado HTTP 500 Internal Server Error
  }
});

//* Listar todos los choferes (según cápsula)
routerChoferes.get('choferes.list', '/all', authUtils.isAdmin, async (ctx) => {
  try {
    const choferes = await ctx.orm.Chofer.findAll();
    ctx.body = choferes;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Obtener un chofer específico (según cápsula)
routerChoferes.get('choferes.show', '/:id', authUtils.isAdmin, async (ctx) => {
  try {
    const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id); //! Busca según Primary Key
    //! Otra forma de hacerlo: const chofer = await ctx.orm.Chofer.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
    ctx.body = chofer;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Actualizar chofer
routerChoferes.put('choferes.update', '/:id', authUtils.isAdmin, async (ctx) => {
  try {
    const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id);

    if (!chofer) {
      ctx.status = 404;
      ctx.body = { error: 'Chofer no encontrado' };
      return;
    }

    await chofer.update(ctx.request.body);

    ctx.body = chofer;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

//* Eliminar un chofer
routerChoferes.delete('choferes.delete', '/:id', authUtils.isAdmin, async (ctx) => {
  try {
    const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id);

    if (!chofer) {
      ctx.status = 404;
      ctx.body = { error: 'Chofer no encontrado' };
      return;
    }

    await chofer.destroy();

    ctx.body = { message: 'Chofer eliminado exitosamente' };
    ctx.status = 204; // Sin contenido (No Content)
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

module.exports = routerChoferes;
