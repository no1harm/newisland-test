const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic/latest', (ctx, next) => {

  abc

  if(true){
    const error = new global.errors.ParamsException()
    // error.requestUrl = `${ctx.method} ${ctx.path}`
    throw error
  }
  
  ctx.body = {"key" : "classic"}
})

module.exports = router