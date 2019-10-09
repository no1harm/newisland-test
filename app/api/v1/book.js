const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/book'
})
const { HotBook } = require('../../models/hot-book')
const { Book } = require('../../models/book')
const { PositiveIntValidator,SearchBookValidator,BookShortCommentValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { BookComment } = require('../../models/book-comment')

router.get('/hot_books', new Auth().token, async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = books
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

router.get('/favor/count',new Auth().token, async (ctx,next) => {
  const count = await Book.getFavorBooksCount(ctx.auth.uid)
  ctx.body = { count }
})

router.get('/:book_id/favor',new Auth().token, async (ctx,next) => {
  const v = await new PositiveIntValidator().validate(ctx,{
    id:'book_id'
  })

  const result = await Book.getBookFavorDetail(ctx.auth.uid,v.get('path.book_id'))

  ctx.body = result
})

router.post('/add/comment',new Auth().token, async (ctx,next) => {
  const v = await new BookShortCommentValidator().validate(ctx,{
    id:'book_id'
  })

  const result = await BookComment.addShortComment(v.get('body.content'),v.get('body.book_id'))

  throw new global.errors.Success()

})

router.get('/:book_id/comments',new Auth().token, async (ctx,next) => {
  const v = await new PositiveIntValidator().validate(ctx,{
    id:'book_id'
  })

  const result = await BookComment.getAllComments(v.get('path.book_id'))

  ctx.body = result

})

module.exports = router