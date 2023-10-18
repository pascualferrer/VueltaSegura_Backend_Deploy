import Router from "koa-router";

const users = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerUsers = new Router();

routerUsers.get('users.list', '/all', async (ctx) => {
    ctx.body = users;
})

export default routerUsers;