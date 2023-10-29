const Router = require("koa-router");
const { DataTypes, Sequelize } = require("sequelize");

const routerClientes = new Router();

//* Obtener un cliente específico para un email
routerClientes.get("clientes.login", "/buscar-por-email", async (ctx) => {
    try {
        const { email } = ctx.request.query;
        console.log(email);

        // Buscar un usuario por correo electrónico
        const cliente = await ctx.orm.Cliente.findOne({
            where: { email: email }
        });

        if (!cliente) {
            // Usuario no encontrado
            ctx.body = { error: 'Cliente no encontrado' };
            ctx.status = 404;  // Código de estado HTTP 404 Not Found
            return;
        }

        ctx.body = cliente;
        ctx.status = 200;  // Código de estado HTTP 200 OK
    } catch (error) {
        // Manejar errores aquí
        console.error(error);
        ctx.body = { error: 'Error al procesar la solicitud' };
        ctx.status = 500;  // Código de estado HTTP 500 Internal Server Error
    }
});

//* Listar todos los clientes (según cápsula)
routerClientes.get("clientes.list", "/", async (ctx) => {
    try {
        const clientes = await ctx.orm.Cliente.findAll();
        ctx.body = clientes;
        ctx.status = 200;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Obtener un cliente específico (según cápsula)
routerClientes.get("clientes.show", "/:id", async (ctx) => {
    try {
        const cliente = await ctx.orm.Cliente.findByPk(ctx.params.id); //! Busca según Primary Key
        //! Otra forma de hacerlo: const cliente = await ctx.orm.Cliente.findOne({where:{id:ctx.params.id}}); Busca según condiciones (igual con findAll)
        ctx.body = cliente;
        ctx.status = 200;
    } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                const errorMessages = error.errors.map((e) => e.message);
                ctx.body = { error: 'Validación fallida', details: errorMessages };
                ctx.status = 400;
            } else {
                ctx.body = { error: 'Error al procesar la solicitud' };
                ctx.status = 500;
            }
        }
})

//* Crear un nuevo cliente (según cápsula)
routerClientes.post("clientes.create", "/registro", async (ctx) => {
    try {
        const cliente = await ctx.orm.Cliente.create(ctx.request.body);
        ctx.body = cliente;
        ctx.status = 201;
    } catch(error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//* Actualizar cliente
routerClientes.put("clientes.update", "/:id", async (ctx) => {
    try {
        const cliente = await ctx.orm.Cliente.findByPk(ctx.params.id);
        
        if (!cliente) {
            ctx.status = 404;
            ctx.body = { error: "Cliente no encontrado" };
            return;
        }

        await cliente.update(ctx.request.body);

        ctx.body = cliente;
        ctx.status = 200;
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});

//* Eliminar un cliente
routerClientes.delete("clientes.delete", "/:id", async (ctx) => {
    try {
        const cliente = await ctx.orm.Cliente.findByPk(ctx.params.id);

        if (!cliente) {
            ctx.status = 404;
            ctx.body = { error: "Cliente no encontrado" };
            return;
        }

        await cliente.destroy();

        ctx.body = { message: "Cliente eliminado exitosamente" };
        ctx.status = 204;  // Sin contenido (No Content)
    } catch (error) {
        ctx.body = { error: error.message || "Ha ocurrido un error" };
        ctx.status = 400;
    }
});


module.exports = routerClientes;