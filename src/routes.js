import Router from "koa-router";

import routerClientes from "./routes/clientes.js";
import routerChats from "./routes/chats.js";
import routerEvaluaciones from "./routes/evaluaciones.js";
import routerPagos from "./routes/pagos.js";
import routerServicios from "./routes/servicios.js";
import routerAdmins from "./routes/administradores.js";
import routerChoferes from "./routes/choferes.js";

const router = new Router();

router.use("/clientes", routerClientes.routes());
router.use("/pagos", routerPagos.routes());
router.use("/servicios", routerServicios.routes());
router.use("/evaluaciones", routerEvaluaciones.routes());
router.use("/chats", routerChats.routes());
router.use("/choferes", routerChoferes.routes());
router.use("/administradores", routerAdmins.routes());

export default router;