import koa from 'koa';
import KoaLogger from 'koa-logger';
import { koaBody } from 'koa-body';
import router from './routes.js';

const app = new koa();

app.use(KoaLogger()); //middleware
app.use(koaBody()); //middleware
app.use(router.routes()); //middleware

app.listen(3000, () => {
    console.log('Iniciando app. Escuchando en puerto 3000');
});