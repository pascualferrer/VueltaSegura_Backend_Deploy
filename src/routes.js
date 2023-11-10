const Router = require("koa-router");

const routerClientes = require("./routes/clientes.js");
const routerChats = require("./routes/chats.js");
const routerEvaluaciones = require("./routes/evaluaciones.js");
const routerPagos = require("./routes/pagos.js");
const routerServicios = require("./routes/servicios.js");
const routerAdmins = require("./routes/administradores.js");
const routerChoferes = require("./routes/choferes.js");
const authRoutes = require("./routes/authentication.js");
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');

dotenv.config();

const router = new Router();

router.use("/pagos", routerPagos.routes());
router.use("/evaluaciones", routerEvaluaciones.routes());

//* Rutas protegidas (requieren JWT)
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } )); //! Comentar si se quiere usar postman
router.use("/clientes", routerClientes.routes());
router.use("/choferes", routerChoferes.routes());
router.use("/administradores", routerAdmins.routes());
router.use("/chats", routerChats.routes());
router.use("/servicios", routerServicios.routes());
router.use(authRoutes.routes());

module.exports = router;