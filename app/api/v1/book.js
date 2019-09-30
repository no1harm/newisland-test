const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/book'
})
const { HotBook } = require('../../models/hot-book')
const { Book } = require('../../models/book')
const { PositiveIntValidator,SearchBookValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')

router.get('/hot_books', new Auth().token, async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = {
    books
  }
})

router.get('/:id/detail',async (ctx,next) => {
  const v = await new PositiveIntValidator().validate(ctx)
  const detail = await new Book(v.get('path.id')).getDetail()
  ctx.body = detail
})

router.get('/search',async (ctx,next) => {
  const v = await new SearchBookValidator().validate(ctx)
  const result = await Book.searchBook(v.get('query.q'),v.get('query.start'),v.get('query.count'))
  ctx.body = result
})

module.exports = router