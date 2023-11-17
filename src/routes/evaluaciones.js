const Router = require('koa-router');

const routerEvaluaciones = new Router();

//* Listar todos los evaluaciones (según cápsula)
routerEvaluaciones.get('evaluaciones.list', '/', async (ctx) => {
  try {
    const evaluaciones = await ctx.orm.Evaluacion.findAll();
    ctx.body = evaluaciones;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Obtener un evaluacion específico (según cápsula)
routerEvaluaciones.get('evaluaciones.show', '/:id', async (ctx) => {
  try {
    const evaluacion = await ctx.orm.Evaluacion.findByPk(ctx.params.id); //! Busca según Primary Key
    //! Otra forma de hacerlo: const evaluacion = await ctx.orm.Evaluacion.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
    ctx.body = evaluacion;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Crear un nuevo evaluacion (según cápsula)
routerEvaluaciones.post('evaluaciones.create', '/', async (ctx) => {
  try {
    const evaluacion = await ctx.orm.Evaluacion.create(ctx.request.body);
    ctx.body = evaluacion;
    ctx.status = 201;
  } catch (error) {
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
      ctx.body = { error: 'Evaluacion no encontrado' };
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
