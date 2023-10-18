import koa from 'koa';

const app = new koa();

app.listen(3000, () => {
    console.log('Iniciando app. Escuchando en puerto 3000');
});