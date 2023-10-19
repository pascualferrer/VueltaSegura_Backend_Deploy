import Router from "koa-router";

const chats = [
    {
        "username": "MarcelinoNuñez",
        "password": "paraquetetraje"
    },
    {
        "username": "Sextor",
        "password": "honestamente"
    }
]

const routerChats = new Router();

routerChats.get('chats.list', '/all', async (ctx) => {
    ctx.body = chats;
})

export default routerChats;