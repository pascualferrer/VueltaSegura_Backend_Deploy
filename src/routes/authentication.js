const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();

//* Para signup de clientes
router.post("authenticate.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let cliente = await ctx.orm.Cliente.findOne({ where: { email: authInfo.email } })
    if (cliente) {
        ctx.body = `The cliente by the email '${authInfo.email}' already exists`;
        ctx.status = 400;
        return;
    }
    try {
        cliente = await ctx.orm.Cliente.create({
            nombre: authInfo.nombre,
            contrasena: authInfo.contrasena,
            email: authInfo.email,
            telefono: authInfo.telefono
        })
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono
    };
    ctx.status = 201;
})

//* Para login de clientes
router.post("authenticator.login", "/login", async (ctx) => {
    let cliente;
    const authInfo = ctx.request.body;
    try {
        cliente = await ctx.orm.Cliente.findOne({where:{email:authInfo.email}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!cliente) {
        ctx.body = `The user by the email '${authInfo.email}' was not found`;
        ctx.status = 400;
        return;   
    }
    if (cliente.contrasena == authInfo.contrasena) {
        ctx.body = {
            nombre: cliente.nombre,
            email: cliente.email,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
        { scope: ['cliente']},
        JWT_PRIVATE_KEY,
        { subject: cliente.id.toString() },
        { expiresIn: expirationSeconds }
    );
    ctx.body = {
        "acces_token": token,
        "token_type": "Bearer",
        "expire_in": expirationSeconds,
    }
    ctx.status = 200;
    
})

module.exports = router;