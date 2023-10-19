import Router from "koa-router";

const choferes = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerChoferes = new Router();

routerChoferes.get('choferes.list', '/all', async (ctx) => {
    ctx.body = choferes;
})

export default routerChoferes;