import Router from "koa-router";

const pagos = [
    {
        "id": 1,
        "servicioId": 1,
        "clienteId": 1
    },
    {
        "id": 2,
        "servicioId": 2,
        "clienteId": 2
    }
]

const routerPagos = new Router();

routerPagos.get('pagos.list', '/all', async (ctx) => {
    ctx.body = pagos;
})

// Obtener un pago específico
routerPagos.get("pagos.show", "/:id", async (ctx) => {
    const id = parseInt(ctx.params.id);
    const pago = pagos.find(c => c.id === id);

    if (pago) {
        ctx.body = pago;
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Pagos no encontrado" };
    }
})

// Crear un nuevo pago
routerPagos.post("pagos.create", "/", async (ctx) => {
    const nuevoPagos = ctx.request.body;

    pagos.push(nuevoPagos);

    ctx.status = 201;
    ctx.body = { mensaje: "Pagos creado exitosamente", pago: nuevoPagos };
})

// Actualizar información de un pago
routerPagos.put("pagos.update", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const pagoIndex = pagos.findIndex(c => c.id === id);

    if (pagoIndex !== -1) {
        const nuevoInfoPagos = ctx.request.body;
        pagos[pagoIndex] = { ...pagos[pagoIndex], ...nuevoInfoPagos };

        ctx.body = { mensaje: "Pagos actualizado exitosamente", pago: pagos[pagoIndex] };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Pagos no encontrado" };
    }
})

// Eliminar un pago
routerPagos.delete("pagos.delete", "/:id", async (ctx) => {
    const id = ctx.params.id;
    const pagoIndex = pagos.findIndex(c => c.id === id);

    if (pagoIndex !== -1) {
        const pagoEliminado = pagos.splice(pagoIndex, 1);

        ctx.body = { mensaje: "Pagos eliminado exitosamente", pago: pagoEliminado };
    } else {
        ctx.status = 404;
        ctx.body = { mensaje: "Pagos no encontrado" };
    }
})

export default routerPagos;