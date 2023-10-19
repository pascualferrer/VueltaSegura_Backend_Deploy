import Router from "koa-router";

const servicios = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerServicios = new Router();

routerServicios.get('servicios.list', '/all', async (ctx) => {
    ctx.body = servicios;
})

export default routerServicios;