import Router from "koa-router";

const choferes = [
    {
        "id": 1,
        "nombre": "Max Verstappen",
        "email": "verstappen@uc.cl",
        "password": "tutututu",
        "telefono": "123456789",
        "historial": 3 //viajes realizados?
    },
    {
        "id": 2,
        "nombre": "Kalule Meléndez",
        "email": "kalule@uc.cl",
        "password": "kalule",
        "telefono": "123456789",
        "historial": 7 //viajes realizados?
    }
]

const routerChoferes = new Router();

routerChoferes.get('choferes.list', '/all', async (ctx) => {
    ctx.body = choferes;
})

// Obtener un chofer específico
routerChoferes.get("choferes.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const chofer = choferes.find(c => c.id === id);

    if (chofer) {
        ctx.body = chofer;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chofer no encontrado" };
    }
})

// Crear un nuevo chofer
routerChoferes.post("choferes.create", "/", async (ctx) => {
    const nuevoChofer = ctx.request.body;

    choferes.push(nuevoChofer);

    ctx.status = 201;
    ctx.body = { mensaje: "Chofer creado exitosamente", chofer: nuevoChofer };
})

// Actualizar información de un chofer
routerChoferes.put("choferes.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const choferesIndex = choferes.findIndex(c => c.id === id);

    if (choferesIndex !== -1) {
        const nuevoInfoChofer = ctx.request.body;
        choferes[choferesIndex] = { ...choferes[choferesIndex], ...nuevoInfoChofer };

        ctx.body = { mensaje: "Chofer actualizado exitosamente", chofer: choferes[choferesIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chofer no encontrado" };
    }
})

// Eliminar un chofer
routerChoferes.delete("choferes.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const choferesIndex = choferes.findIndex(c => c.id === id);

    if (choferesIndex !== -1) {
        const choferEliminado = choferes.splice(choferesIndex, 1);

        ctx.body = { mensaje: "Chofer eliminado exitosamente", chofer: choferEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Chofer no encontrado" };
    }
})

export default routerChoferes;