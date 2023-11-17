const Router = require('koa-router');

const routerChats = new Router();

//* Listar todos los chats (según cápsula)
routerChats.get('chats.list', '/', async (ctx) => {
  try {
    const chats = await ctx.orm.Chat.findAll();
    ctx.body = chats;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Obtener un chat específico (según cápsula)
routerChats.get('chats.show', '/:id', async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findByPk(ctx.params.id); //! Busca según Primary Key
    //! Otra forma de hacerlo: const chat = await ctx.orm.Chat.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
    ctx.body = chat;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Crear un nuevo chat (según cápsula)
routerChats.post('chats.create', '/', async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.create(ctx.request.body);
    ctx.body = chat;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

//* Actualizar chat
routerChats.put('chats.update', '/:id', async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findByPk(ctx.params.id);

    if (!chat) {
      ctx.status = 404;
      ctx.body = { error: 'Chat no encontrado' };
      return;
    }

    await chat.update(ctx.request.body);

    ctx.body = chat;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

//* Eliminar un chat
routerChats.delete('chats.delete', '/:id', async (ctx) => {
  try {
    const chat = await ctx.orm.Chat.findByPk(ctx.params.id);

    if (!chat) {
      ctx.status = 404;
      ctx.body = { error: 'Chat no encontrado' };
      return;
    }

    await chat.destroy();

    ctx.body = { message: 'Chat eliminado exitosamente' };
    ctx.status = 204; // Sin contenido (No Content)
  } catch (error) {
    ctx.body = { error: error.message || 'Ha ocurrido un error' };
    ctx.status = 400;
  }
});

module.exports = routerChats;
