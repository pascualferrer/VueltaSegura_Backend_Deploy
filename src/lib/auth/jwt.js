var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function getJWTScope(token) {
    const secret = process.env.JWT_SECRET;
    var payload = jwt.verify(token, secret);
    return payload.scope;
}

async function isCliente(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('cliente'), 403, "You're not a Cliente")
}

async function isChofer(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('chofer'), 403, "You're not a Chofer")
}

async function isAdmin(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('admin'), 403, "You're not an Admin")
}

module.exports = {
    isAdmin, isChofer, isCliente
};