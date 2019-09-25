const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const router = new Router({
  prefix:'/v1/user'
})

const { Users } = require('../../models/user')


router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    nickname:v.get('body.nickname'),
    email:v.get('body.email'),
    password:v.get('body.password2')
  }
  Users.create(user)
  throw new global.errors.Success()
})

module.exports = router