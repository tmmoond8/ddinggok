const Router = require('koa-router');

const game = new Router();
game.get('/', (ctx) => {
  ctx.body = 'game api';
});

module.exports = game;