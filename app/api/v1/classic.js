const Router = require('koa-router')
const { PositiveIntValidator,LikeValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const router = new Router({
  prefix:'/v1/classic'
})

router.get('/latest', new Auth(7).token, async (ctx, next) => {

  const latest = await Flow.findOne({
    order:[
      ['index','DESC']
    ]
  })

  const art = await Art.getData(latest.art_id,latest.type)

  // 使用 sequelize 中的 setDataValue 添加属性
  art.setDataValue('index',latest.index)

  ctx.body = art

})

router.post('/like_status',new Auth().token, async(ctx,next) => {
  const v = await new LikeValidator().validate(ctx,{
    id:'art_id'
  })

  const status = await Favor.likeStatus(ctx.auth.uid,v.get('body.art_id'),v.get('body.type'))

  ctx.body = {
    like_status:status
  }

})

module.exports = router