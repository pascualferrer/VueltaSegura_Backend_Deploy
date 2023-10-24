const Router = require("koa-router");


const routerServicios = new Router();

//* Listar todos los servicios (según cápsula)
routerServicios.get("servicios.list", "/", async (ctx) => {
    try {
        const servicios = await ctx.orm.Servicio.findAll();
        ctx.body = servicios;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Obtener un servicio específico (según cápsula)
routerServicios.get("servicios.show", "/:id", async (ctx) => {
    try {
        const servicio = await ctx.orm.Servicio.findByPk(ctx.params.id); //! Busca según Primary Key
        //! Otra forma de hacerlo: const servicio = await ctx.orm.Servicio.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
        ctx.body = servicio;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Crear un nuevo servicio (según cápsula)
routerServicios.post("servicios.create", "/", async (ctx) => {
    try {
        const servicio = await ctx.orm.Servicio.create(ctx.request.body);
        ctx.body = servicio;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Actualizar servicio
routerServicios.put("servicios.update", "/:id", async (ctx) => {
    try {
        const servicio = await ctx.orm.Servicio.findByPk(ctx.params.id);
        
        if (!servicio) {
            ctx.status = 404;
            ctx.body = { error: "Servicio no encontrado" };
            return;
        }

        await servicio.update(ctx.request.body);

        ctx.body = servicio;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});

//* Eliminar un servicio
routerServicios.delete("servicios.delete", "/:id", async (ctx) => {
    try {
        const servicio = await ctx.orm.Servicio.findByPk(ctx.params.id);

        if (!servicio) {
            ctx.status = 404;
            ctx.body = { error: "Servicio no encontrado" };
            return;
        }

        await servicio.destroy();

        ctx.body = { message: "Servicio eliminado exitosamente" };
        ctx.status = 204;  // Sin contenido (No Content)
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});


module.exports = routerServicios;