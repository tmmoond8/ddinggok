const Router = require('koa-router');
const game = require('./game');
const v10 = new Router();

v10.use('/game', game.routes());

module.exports = v10;