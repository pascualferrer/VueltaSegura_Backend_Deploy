const Router = require("koa-router");

const routerClientes = require("./routes/clientes.js");
const routerChats = require("./routes/chats.js");
const routerEvaluaciones = require("./routes/evaluaciones.js");
const routerPagos = require("./routes/pagos.js");
const routerServicios = require("./routes/servicios.js");
const routerAdmins = require("./routes/administradores.js");
const routerChoferes = require("./routes/choferes.js");
const authRoutesClientes = require("./routes/authenticationClientes.js");
const authRoutesChoferes = require("./routes/authenticationChoferes.js");
const authRoutesAdmins = require("./routes/authenticationAdmins.js");
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const scopeProtectedRoutes = require('./routes/scope.js')

dotenv.config();

const router = new Router();

router.use("/pagos", routerPagos.routes());
router.use("/evaluaciones", routerEvaluaciones.routes());
router.use(authRoutesClientes.routes());
router.use(authRoutesChoferes.routes());
router.use(authRoutesAdmins.routes());
router.use("/chats", routerChats.routes());
router.use("/servicios", routerServicios.routes());

//* Rutas protegidas (requieren JWT)
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } )); //! Comentar si se quiere usar postman

router.use("/clientes", routerClientes.routes());
router.use("/choferes", routerChoferes.routes());
router.use("/administradores", routerAdmins.routes());

router.use('/scope', scopeProtectedRoutes.routes());

module.exports = router;