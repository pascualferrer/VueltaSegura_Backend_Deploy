const Router = require("koa-router");
const administradores = [
    {
        "id": 1,
        "nombre": "Chupete Suazo",
        "email": "suazo@uc.cl",
        "password": "papito"
    },
    {
        "id": 2,
        "nombre": "Esteban Efrain",
        "email": "tanker@uc.cl",
        "password": "supertanker"
    }
]

// Listar todos los admins
const routerAdmins = new Router();

routerAdmins.get('administradores.list', '/all', async (ctx) => {
    ctx.body = administradores;
})

// Obtener un admin específico
routerAdmins.get("administradores.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const administrador = administradores.find(c => c.id === id);

    if (administrador) {
        ctx.body = administrador;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Administrador no encontrado" };
    }
})

// Crear un nuevo admin
routerAdmins.post("administradores.create", "/", async (ctx) => {
    const nuevoAdmin = ctx.request.body;

    administradores.push(nuevoAdmin);

    ctx.status = 201;
    ctx.body = { mensaje: "Administrador creado exitosamente", administradore: nuevoAdmin };
})

// Actualizar información de un admin
routerAdmins.put("administradores.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const adminIndex = administradores.findIndex(c => c.id === id);

    if (adminIndex !== -1) {
        const nuevoInfoAdmin = ctx.request.body;
        administradores[adminIndex] = { ...administradores[adminIndex], ...nuevoInfoAdmin };

        ctx.body = { mensaje: "Administrador actualizado exitosamente", administradore: administradores[adminIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Administrador no encontrado" };
    }
})

// Eliminar un admin
routerAdmins.delete("administradores.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const adminIndex = administradores.findIndex(c => c.id === id);

    if (adminIndex !== -1) {
        const adminEliminado = administradores.splice(adminIndex, 1);

        ctx.body = { mensaje: "Administrador eliminado exitosamente", administradore: adminEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Administrador no encontrado" };
    }
})

module.exports = routerAdmins;