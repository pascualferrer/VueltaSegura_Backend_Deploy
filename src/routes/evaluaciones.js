import Router from "koa-router";

const evaluaciones = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerEvaluaciones = new Router();

routerEvaluaciones.get('evaluaciones.list', '/all', async (ctx) => {
    ctx.body = evaluaciones;
})

export default routerEvaluaciones;