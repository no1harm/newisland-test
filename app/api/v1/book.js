const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic/book', (ctx, next) => {
  ctx.body = {"key" : "book"}
})

module.exports = router