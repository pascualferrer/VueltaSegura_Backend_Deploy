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

async function isChoferOrAdmin(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    ctx.assert(scope.includes('admin') || scope.includes('chofer'), 403, "You're not an Admin or Chofer");
}

async function isClienteOrAdmin(ctx, next) {
    await next();
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTScope(token);
    console.log(token);
    console.log(scope);
    ctx.assert(scope.includes('admin') || scope.includes('cliente'), 403, "You're not an Admin or Cliente");
}

module.exports = {
    isAdmin, isChofer, isCliente, isChoferOrAdmin, isClienteOrAdmin
};