const Router = require("koa-router");

const evaluaciones = [
    {
        "id": 1,
        "comentario": "mano tengo fe",
        "calificacion": 7,
        "choferId": 1
    },
    {
        "id": 2,
        "comentario": "gooool de la vinotintoo",
        "calificacion": 9,
        "choferId": 1
    }
]

const routerEvaluaciones = new Router();

routerEvaluaciones.get('evaluaciones.list', '/all', async (ctx) => {
    ctx.body = evaluaciones;
})

// Obtener un evaluacion específico
routerEvaluaciones.get("evaluaciones.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const evaluacion = evaluaciones.find(c => c.id === id);

    if (evaluacion) {
        ctx.body = evaluacion;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Evaluacion no encontrado" };
    }
})

// Crear un nuevo evaluacion
routerEvaluaciones.post("evaluaciones.create", "/", async (ctx) => {
    const nuevoEvaluacion = ctx.request.body;

    evaluaciones.push(nuevoEvaluacion);

    ctx.status = 201;
    ctx.body = { mensaje: "Evaluacion creado exitosamente", evaluacion: nuevoEvaluacion };
})

// Actualizar información de un evaluacion
routerEvaluaciones.put("evaluaciones.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const evaluacionIndex = evaluaciones.findIndex(c => c.id === id);

    if (evaluacionIndex !== -1) {
        const nuevoInfoEvaluacion = ctx.request.body;
        evaluaciones[evaluacionIndex] = { ...evaluaciones[evaluacionIndex], ...nuevoInfoEvaluacion };

        ctx.body = { mensaje: "Evaluacion actualizado exitosamente", evaluacion: evaluaciones[evaluacionIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Evaluacion no encontrado" };
    }
})

// Eliminar un evaluacion
routerEvaluaciones.delete("evaluaciones.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const evaluacionIndex = evaluaciones.findIndex(c => c.id === id);

    if (evaluacionIndex !== -1) {
        const evaluacionEliminado = evaluaciones.splice(evaluacionIndex, 1);

        ctx.body = { mensaje: "Evaluacion eliminado exitosamente", evaluacion: evaluacionEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Evaluacion no encontrado" };
    }
})

module.exports = routerEvaluaciones;