const Router = require('koa-router')
const { LikeValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const router = new Router({
  prefix:'/v1/like'
})

router.post('/', new Auth(7).token, async (ctx, next) => {

  
  const v = await new LikeValidator().validate(ctx,{
    id:'art_id'
  })

  await Favor.like(ctx.auth.uid,v.get('body.art_id'),v.get('body.type'))

  throw new global.errors.Success()

})

router.post('/cancel', new Auth(7).token, async (ctx, next) => {

  
  const v = await new LikeValidator().validate(ctx,{
    id:'art_id'
  })

  await Favor.disLike(ctx.auth.uid,v.get('body.art_id'),v.get('body.type'))

  throw new global.errors.Success()

})

module.exports = router