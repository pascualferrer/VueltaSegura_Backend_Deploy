import Router from "koa-router";

const pagos = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerPagos = new Router();

routerPagos.get('pagos.list', '/all', async (ctx) => {
    ctx.body = pagos;
})

export default routerPagos;