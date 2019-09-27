const Router = require('koa-router')
const { LoginType } = require('../../lib/enum')
const { Users } = require('../../models/user')
const { TokenValidator, NoEmptyValidator } = require('../../validators/validator')
const { generateToken } = require('../../../core/utils')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
  prefix:'/v1/token'
})
const { WxManager } = require('../../services/wx')

router.post('/',async (ctx,next) => {
  const v = await new TokenValidator().validate(ctx)
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_MINI_PROGRAM:
      token = await WxManager.codeToToken(v.get('body.account'))
      break;
    case LoginType.USER_MAIL:
      token = await emailLogin(v.get('body.account'),v.get('body.secret'))
      break
    case LoginType.USER_MOBILE:
      break
    case LoginType.ADMIN_MAIL:
      break
    default:
      throw new global.errors.ParameterException('没有对应的处理函数')
      break;
  }
  ctx.body = {
    token
  }
})

router.post('/verify',async (ctx,next) => {
  const v = await new NoEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = { is_valide:result }
})

async function emailLogin(email,secret){
  const user = await Users.verifyEmailPassword(email,secret)
  return token = generateToken(user.id,Auth.USER)
}

module.exports = router