const Router = require("koa-router");
const chats = [
    {
        "id": 1,
        "clienteId": 1,
        "choferId": 1,
        "adminId": 1,
        "mensaje": "LE PEGÓ"
    },
    {
        "id": 2,
        "clienteId": 2,
        "choferId": 2,
        "adminId": 2,
        "mensaje": "Claudio palma"
    }
]

const routerChats = new Router();

routerChats.get('chats.list', '/all', async (ctx) => {
    ctx.body = chats;
})

// Obtener un chat específico
routerChats.get("chats.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const chat = chats.find(c => c.id === id);

    if (chat) {
        ctx.body = chat;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chat no encontrado" };
    }
})

// Crear un nuevo chat
routerChats.post("chats.create", "/", async (ctx) => {
    const nuevoChat = ctx.request.body;

    chats.push(nuevoChat);

    ctx.status = 201;
    ctx.body = { mensaje: "Chat creado exitosamente", chat: nuevoChat };
})

// Actualizar información de un chat
routerChats.put("chats.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const chatIndex = chats.findIndex(c => c.id === id);

    if (chatIndex !== -1) {
        const nuevoInfoChat = ctx.request.body;
        chats[chatIndex] = { ...chats[chatIndex], ...nuevoInfoChat };

        ctx.body = { mensaje: "Chat actualizado exitosamente", chat: chats[chatIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chat no encontrado" };
    }
})

// Eliminar un chat
routerChats.delete("chats.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const chatIndex = chats.findIndex(c => c.id === id);

    if (chatIndex !== -1) {
        const chatEliminado = chats.splice(chatIndex, 1);

        ctx.body = { mensaje: "Chat eliminado exitosamente", chat: chatEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chat no encontrado" };
    }
})

module.exports = routerChats;