// TODO: ver si es necesario -> modificar routes.js -> Cápsula 16 (min 35:00 aprox)
const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');

const router = new Router();

router.get('/protectedCliente', authUtils.isClienteOrAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Cliente accedida', cliente: ctx.state.user
  };
});

router.get('/protectedChofer', authUtils.isChoferOrAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Chofer accedida', chofer: ctx.state.user
  };
});

router.get('/protectedAdmin', authUtils.isAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Admin accedida', admin: ctx.state.user
  };
});

router.get('/protectedServicio', authUtils.isAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Admin accedida', admin: ctx.state.user
  };
});

router.get('/protectedServicioChofer', authUtils.isChoferOrAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Cliente accedida', cliente: ctx.state.user
  };
});

router.get('/protectedServicioCliente', authUtils.isClienteOrAdmin, async (ctx) => {
  ctx.body = {
    message: 'Ruta protegida de Cliente accedida', cliente: ctx.state.user
  };
});

module.exports = router;
