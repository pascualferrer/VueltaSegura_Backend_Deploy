import Router from "koa-router";

const clientes = [
    {
        "id": 1,
        "nombre": "Marcelino Nuñez",
        "email": "marcelindo@uc.cl",
        "password": "paraquetetraje",
        "telefono": "123456789"
    },
    {
        "id": 2,
        "nombre": "Sextor",
        "email": "htenoric@uc.cl",
        "password": "honestamente",
        "telefono": "987654321",
    }
]

const routerClientes = new Router();

// Listar todos los clientes
routerClientes.get("clientes.list", "/all", async (ctx) => {
    ctx.body = clientes;
})

// Obtener un cliente específico
routerClientes.get("clientes.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        ctx.body = cliente;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Cliente no encontrado" };
    }
})

// Crear un nuevo cliente
routerClientes.post("clientes.create", "/", async (ctx) => {
    const nuevoCliente = ctx.request.body;

    clientes.push(nuevoCliente);

    ctx.status = 201;
    ctx.body = { mensaje: "Cliente creado exitosamente", cliente: nuevoCliente };
})

// Actualizar información de un cliente
routerClientes.put("clientes.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex !== -1) {
        const nuevoInfoCliente = ctx.request.body;
        clientes[clienteIndex] = { ...clientes[clienteIndex], ...nuevoInfoCliente };

        ctx.body = { mensaje: "Cliente actualizado exitosamente", cliente: clientes[clienteIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Cliente no encontrado" };
    }
})

// Eliminar un cliente
routerClientes.delete("clientes.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex !== -1) {
        const clienteEliminado = clientes.splice(clienteIndex, 1);

        ctx.body = { mensaje: "Cliente eliminado exitosamente", cliente: clienteEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Cliente no encontrado" };
    }
})

export default routerClientes;