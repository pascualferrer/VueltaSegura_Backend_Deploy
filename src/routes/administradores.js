import Router from "koa-router";

const administradores = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerAdmins = new Router();

routerAdmins.get('administradores.list', '/all', async (ctx) => {
    ctx.body = administradores;
})

export default routerAdmins;