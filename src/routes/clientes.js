const Router = require("koa-router");
const { DataTypes, Sequelize } = require("sequelize");

const routerClientes = new Router();

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
        // Verificar si el correo electrónico ya está registrado
        const existingCliente = await ctx.orm.Cliente.findOne({
            where: { email: ctx.request.body.email }
        });

        if (existingCliente) {
            // Correo electrónico ya registrado
            ctx.body = { error: 'Correo electrónico ya registrado' };
            ctx.status = 409;  // Código de estado HTTP 409 Conflict
            return;
        }

        // Verificar si la contraseña cumple con los requisitos de seguridad
        const contrasena = ctx.request.body.contrasena;
        if (!contrasena.match(/[a-z]/) || !contrasena.match(/[0-9]/) || !contrasena.match(/[@$!%*?&]/)) {
            // Contraseña no cumple con los requisitos
            ctx.body = { error: 'La contraseña debe tener al menos un número, una letra y un caracter especial' };
            ctx.status = 400;  // Código de estado HTTP 400 Bad Request
            return;
        }

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