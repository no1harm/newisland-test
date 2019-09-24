const Router = require('koa-router')
const router = new Router()
const { PositiveIntValidator } = require('../../validators/validator')

router.get('/v1/:id/classic/latest', async (ctx, next) => {

  const v = await new PositiveIntValidator().validate(ctx)

  // 使用 LinValidator 获取 body 参数
  // const id = v.get('body',parsed=false)
  
  ctx.body = {"x":"x"}
  
})

module.exports = router