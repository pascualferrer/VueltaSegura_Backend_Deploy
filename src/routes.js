const Router = require("koa-router");

const routerClientes = require("./routes/clientes.js");
const routerChats = require("./routes/chats.js");
const routerEvaluaciones = require("./routes/evaluaciones.js");
const routerPagos = require("./routes/pagos.js");
const routerServicios = require("./routes/servicios.js");
const routerAdmins = require("./routes/administradores.js");
const routerChoferes = require("./routes/choferes.js");

const router = new Router();

router.use("/clientes", routerClientes.routes());
router.use("/pagos", routerPagos.routes());
router.use("/servicios", routerServicios.routes());
router.use("/evaluaciones", routerEvaluaciones.routes());
router.use("/chats", routerChats.routes());
router.use("/choferes", routerChoferes.routes());
router.use("/administradores", routerAdmins.routes());

module.exports = router;