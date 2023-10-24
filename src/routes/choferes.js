const Router = require("koa-router");

const routerChoferes = new Router();

//* Listar todos los choferes (según cápsula)
routerChoferes.get("choferes.list", "/", async (ctx) => {
    try {
        const choferes = await ctx.orm.Chofer.findAll();
        ctx.body = choferes;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Obtener un chofer específico (según cápsula)
routerChoferes.get("choferes.show", "/:id", async (ctx) => {
    try {
        const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id); //! Busca según Primary Key
        //! Otra forma de hacerlo: const chofer = await ctx.orm.Chofer.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
        ctx.body = chofer;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Crear un nuevo chofer (según cápsula)
routerChoferes.post("choferes.create", "/registro", async (ctx) => {
    try {
        const chofer = await ctx.orm.Chofer.create(ctx.request.body);
        ctx.body = chofer;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Actualizar chofer
routerChoferes.put("choferes.update", "/:id", async (ctx) => {
    try {
        const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id);
        
        if (!chofer) {
            ctx.status = 404;
            ctx.body = { error: "Chofer no encontrado" };
            return;
        }

        await chofer.update(ctx.request.body);

        ctx.body = chofer;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});

//* Eliminar un chofer
routerChoferes.delete("choferes.delete", "/:id", async (ctx) => {
    try {
        const chofer = await ctx.orm.Chofer.findByPk(ctx.params.id);

        if (!chofer) {
            ctx.status = 404;
            ctx.body = { error: "Chofer no encontrado" };
            return;
        }

        await chofer.destroy();

        ctx.body = { message: "Chofer eliminado exitosamente" };
        ctx.status = 204;  // Sin contenido (No Content)
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});

module.exports = routerChoferes;