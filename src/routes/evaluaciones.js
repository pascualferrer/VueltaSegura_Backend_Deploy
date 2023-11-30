const Router = require('koa-router');

const routerEvaluaciones = new Router();

//* Listar todos los evaluaciones (según cápsula)
routerEvaluaciones.get('evaluaciones.list', '/all', async (ctx) => {
  try {
    const evaluaciones = await ctx.orm.Evaluacion.findAll();
    ctx.body = evaluaciones;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Encontrar evaluaciones del chofer
routerEvaluaciones.get('evaluaciones.chofer', '/buscar-por-id', async (ctx) => {
  try {
    const { choferID } = ctx.request.query;
    const evaluaciones = await ctx.orm.Evaluacion.findAll({
      where: { choferID },
      include: [{ model: ctx.orm.Cliente, as: 'Cliente' }]
    });
    ctx.body = evaluaciones;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Crear una nueva evaluacion (según cápsula)
routerEvaluaciones.post('evaluaciones.create', '/', async (ctx) => {
  try {
    // Crea la evaluación con la información recibida
    const evaluacion = await ctx.orm.Evaluacion.create(ctx.request.body);

    // Responde con la evaluación creada y el estado 201 (Created)
    ctx.body = evaluacion;
    ctx.status = 201;
  } catch (error) {
    // Si hay un error, responde con el error y el estado 400 (Bad Request)
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Actualizar evaluacion
routerEvaluaciones.put('evaluaciones.update', '/:id', async (ctx) => {
  try {
    const evaluacion = await ctx.orm.Evaluacion.findByPk(ctx.params.id);

    if (!evaluacion) {
      ctx.status = 404;
      ctx.body = { error: 'Evaluacion no encontrada' };
      return;
    }

    await evaluacion.update(ctx.request.body);

    ctx.body = evaluacion;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

//* Eliminar un evaluacion
routerEvaluaciones.delete('evaluaciones.delete', '/:id', async (ctx) => {
  try {
    const evaluacion = await ctx.orm.Evaluacion.findByPk(ctx.params.id);

    if (!evaluacion) {
      ctx.status = 404;
      ctx.body = { error: 'Evaluacion no encontrado' };
      return;
    }

    await evaluacion.destroy();

    ctx.body = { message: 'Evaluacion eliminado exitosamente' };
    ctx.status = 204; // Sin contenido (No Content)
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

module.exports = routerEvaluaciones;
