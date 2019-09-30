const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/book'
})
const { HotBook } = require('../../models/hot-book')
const { Book } = require('../../models/book')
const { PositiveIntValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

router.get('/hot_books', new Auth().token, async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {
    books
  }
})

router.get('/:id',async (ctx,next) => {
  const v = await new PositiveIntValidator().validate(ctx)
  const detail = await new Book(v.get('path.id')).getDetail()
  console.log('-------------------')
  console.log(detail)
  ctx.body = detail
})

module.exports = router