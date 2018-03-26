const Router = require('koa-router');
const game = require('./game');
const admin = require('./admin');
const v10 = new Router();

v10.use('/game', game.routes());
v10.use('/admin', admin.routes());

module.exports = v10;