require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const Router = require('koa-router');
const api = require('./api');
const db = require('./db');

db.connect();
const {
  PORT: port
} = process.env;

// set public static directory 
app.use(static(__dirname.replace('src', 'public')));

// set router
const router = new Router();
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(ctx => {
  ctx.body = 'hello ddinggok!';
});

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});