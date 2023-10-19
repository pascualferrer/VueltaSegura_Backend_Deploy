import koa from 'koa';
import KoaLogger from 'koa-logger';
import { koaBody } from 'koa-body';
import router from './routes.js';

const app = new koa();

//app.use((ctx, next) => { // ctx = contexto (contiene la info de la request)
   // ctx.body = "Body del middleware";
   // next(); // next = indica que la solicitud debe pasar al siguiente middleware
//});

app.use(KoaLogger());
app.use(koaBody());
app.use(router.routes());

app.listen(3000, () => {
    console.log('Iniciando app. Escuchando en puerto 3000');
});

// Después de la configuración de rutas
app.use((ctx, next) => {
    console.log(`Ruta detectada: ${ctx.request.method} ${ctx.request.path}`);
    return next();
});
