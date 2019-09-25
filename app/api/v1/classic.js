const Router = require('koa-router')
const { PositiveIntValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
  prefix:'/v1/classic'
})

router.get('/latest', new Auth(7).token, async (ctx, next) => {

  // const v = await new PositiveIntValidator().validate(ctx)
  
  // ctx.body = {"x":"x"}

  ctx.body = ctx.auth
  
})

module.exports = router