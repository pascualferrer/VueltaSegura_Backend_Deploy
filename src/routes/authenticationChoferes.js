const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

//* Para signup de choferes
router.post('authenticate.signup', '/choferes/signup', async (ctx) => {
  const authInfo = ctx.request.body;
  let chofer = await ctx.orm.Chofer.findOne({ where: { email: authInfo.email } });
  if (chofer) {
    ctx.body = `The chofer by the email '${authInfo.email}' already exists`;
    ctx.status = 400;
    return;
  }
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(authInfo.contrasena, saltRounds);

    chofer = await ctx.orm.Chofer.create({
      nombre: authInfo.nombre,
      contrasena: hashPassword,
      email: authInfo.email,
      telefono: authInfo.telefono
    });
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  ctx.body = {
    nombre: chofer.nombre,
    email: chofer.email,
    telefono: chofer.telefono
  };
  ctx.status = 201;
});

//* Para login de choferes
router.post('authenticator.login', '/choferes/login', async (ctx) => {
  let chofer;
  const authInfo = ctx.request.body;
  try {
    chofer = await ctx.orm.Chofer.findOne({ where: { email: authInfo.email } });
    console.log(authInfo.email);
  } catch (error) {
    ctx.body = error;
    console.log(error);
    ctx.status = 400;
    return;
  }
  if (!chofer) {
    ctx.body = `The chofer by the email '${authInfo.email}' was not found`;
    ctx.status = 400;
    return;
  }

  const validation = await bcrypt.compare(authInfo.contrasena, chofer.contrasena);

  if (validation) {
    ctx.body = {
      nombre: chofer.nombre,
      email: chofer.email
    };
    ctx.status = 200;
  } else {
    ctx.body = 'Incorrect password';
    ctx.status = 400;
    return;
  }
  const expirationSeconds = 1 * 60 * 60 * 24;
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
  const token = jwt.sign(
    { scope: ['chofer'] },
    JWT_PRIVATE_KEY,
    { subject: chofer.id.toString() },
    { expiresIn: expirationSeconds }
  );
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
    expire_in: expirationSeconds,
    id: chofer.id,
    nombre: chofer.nombre,
    tipo: 'chofer'
  };
  ctx.status = 200;
});

module.exports = router;
