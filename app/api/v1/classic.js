const Router = require('koa-router')
const { PositiveIntValidator,LikeValidator,ClassicValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')
const { HotBook } = require('../../models/hot-book')
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

  const status = await Favor.userLikeStatus(ctx.auth.uid,v.get('body.art_id'),v.get('body.type'))

  ctx.body = {
    like_status:status
  }

})

router.get('/:type/:id/favor',new Auth().token, async(ctx,next) => {
  const v = await new ClassicValidator().validate(ctx)

  const id = v.get('path.id')

  const type = v.get('path.type')

  const art = await new Art(id,parseInt(type)).getDataDetail(ctx.auth.uid)  

  ctx.body = {
    fav_nums:art.detail.fav_nums,
    like_status:art.like_status
  }

})

router.get('/:type/:id',new Auth().token, async(ctx,next) => {
  const v = await new ClassicValidator().validate(ctx)

  const id = v.get('path.id')

  const type = v.get('path.type')

  const art = await new Art(id,parseInt(type)).getDataDetail(ctx.auth.uid)

  art.detail.setDataValue('like_status',art.like_status)

  ctx.body = art.detail
})


router.get('/favors',new Auth().token, async(ctx,next) => {
  
  const uid = ctx.auth.uid

  const result = await Favor.getUserAllFavors(uid)

  ctx.body = result

})


router.get('/generate_book',new Auth().token,async (ctx,next) => {
  const book = {
    id:Math.round(Math.random()*1000),
    image:randomString(16),
    author:randomString(10),
    title:randomString(10)
  }
  HotBook.create(book)
  throw new global.errors.Success()
})

function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

module.exports = router