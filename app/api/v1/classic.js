const Router = require('koa-router')
const { PositiveIntValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
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

module.exports = router