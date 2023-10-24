const Router = require("koa-router");

const routerPagos = new Router();

//* Listar todos los pagos (según cápsula)
routerPagos.get("pagos.list", "/", async (ctx) => {
    try {
        const pagos = await ctx.orm.Pago.findAll();
        ctx.body = pagos;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Obtener un pago específico (según cápsula)
routerPagos.get("pagos.show", "/:id", async (ctx) => {
    try {
        const pago = await ctx.orm.Pago.findByPk(ctx.params.id); //! Busca según Primary Key
        //! Otra forma de hacerlo: const pago = await ctx.orm.Pago.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
        ctx.body = pago;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Crear un nuevo pago (según cápsula)
routerPagos.post("pagos.create", "/", async (ctx) => {
    try {
        const pago = await ctx.orm.Pago.create(ctx.request.body);
        ctx.body = pago;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Actualizar pago
routerPagos.put("pagos.update", "/:id", async (ctx) => {
    try {
        const pago = await ctx.orm.Pago.findByPk(ctx.params.id);
        
        if (!pago) {
            ctx.status = 404;
            ctx.body = { error: "Pago no encontrado" };
            return;
        }

        await pago.update(ctx.request.body);

        ctx.body = pago;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});

//* Eliminar un pago
routerPagos.delete("pagos.delete", "/:id", async (ctx) => {
    try {
        const pago = await ctx.orm.Pago.findByPk(ctx.params.id);

        if (!pago) {
            ctx.status = 404;
            ctx.body = { error: "Pago no encontrado" };
            return;
        }

        await pago.destroy();

        ctx.body = { message: "Pago eliminado exitosamente" };
        ctx.status = 204;  // Sin contenido (No Content)
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});


module.exports = routerPagos;