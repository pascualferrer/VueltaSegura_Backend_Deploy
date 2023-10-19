import Router from "koa-router";

const servicios = [
    {
        "id": 1,
        "clienteId": 1,
        "choferId": 1,
        "precio": 5000,
        "tipo": "estándar",
        "hora": "22:00",
        "fecha": "12/10/2023",
        "estado": "completado",
        "origen": "Los Dominicos",
        "destino": "Club Hípico"
    }
]

const routerServicios = new Router();

// Obtener todos los servicios
routerServicios.get('servicios.list', '/all', async (ctx) => {
    ctx.body = servicios;
})

// Obtener un servicio específico
routerServicios.get("servicios.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const servicio = servicios.find(c => c.id === id);

    if (servicio) {
        ctx.body = servicio;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Servicio no encontrado" };
    }
})

// Crear un nuevo servicio
routerServicios.post("servicios.create", "/", async (ctx) => {
    const nuevoServicio = ctx.request.body;

    servicios.push(nuevoServicio);

    ctx.status = 201;
    ctx.body = { mensaje: "Servicio creado exitosamente", servicio: nuevoServicio };
})

// Actualizar información de un servicio
routerServicios.put("servicios.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const servicioIndex = servicios.findIndex(c => c.id === id);

    if (servicioIndex !== -1) {
        const nuevoInfoServicio = ctx.request.body;
        servicios[servicioIndex] = { ...servicios[servicioIndex], ...nuevoInfoServicio };

        ctx.body = { mensaje: "Servicio actualizado exitosamente", servicio: servicios[servicioIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Servicio no encontrado" };
    }
})

// Eliminar un servicio
routerServicios.delete("servicios.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const servicioIndex = servicios.findIndex(c => c.id === id);

    if (servicioIndex !== -1) {
        const servicioEliminado = servicios.splice(servicioIndex, 1);

        ctx.body = { mensaje: "Servicio eliminado exitosamente", servicio: servicioEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Servicio no encontrado" };
    }
})

export default routerServicios;