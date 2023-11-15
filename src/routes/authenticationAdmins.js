const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

//* Para signup de admins
router.post("authenticate.signup", "/admin/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let admin = await ctx.orm.Admin.findOne({ where: { email: authInfo.email } })
    if (admin) {
        ctx.body = `The admin by the email '${authInfo.email}' already exists`;
        ctx.status = 400;
        return;
    }
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(authInfo.contrasena, saltRounds);

        admin = await ctx.orm.Admin.create({
            nombre: authInfo.nombre,
            contrasena: hashPassword,
            email: authInfo.email
        })
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        nombre: admin.nombre,
        email: admin.email,
    };
    ctx.status = 201;
})

//* Para login de admins
router.post("authenticator.login", "/admin/login", async (ctx) => {
    let admin;
    const authInfo = ctx.request.body;
    try {
        admin = await ctx.orm.Admin.findOne({ where: {email: authInfo.email } });
        console.log(authInfo.email)
    }
    catch(error) {
        ctx.body = error;
        console.log(error);
        ctx.status = 400;
        return;
    }
    if (!admin) {
        ctx.body = `The admin by the email '${authInfo.email}' was not found`;
        ctx.status = 400;
        return;   
    }

    const validation = await bcrypt.compare(authInfo.contrasena, admin.contrasena);

    if (validation) {
        ctx.body = {
            nombre: admin.nombre,
            email: admin.email,
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
        { scope: ['admin']},
        JWT_PRIVATE_KEY,
        { subject: admin.id.toString() },
        { expiresIn: expirationSeconds }
    );
    ctx.body = {
        "access_token": token,
        "token_type": "Bearer",
        "expire_in": expirationSeconds,
        "id": admin.id, 
        "nombre": admin.nombre,
        "tipo": "admin"
    }
    ctx.status = 200;
    
})

module.exports = router;