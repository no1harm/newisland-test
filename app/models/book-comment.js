const { Sequelize, Model } = require('sequelize')
const util = require('util')
const { sequelize } = require('../../core/db')

class BookComment extends Model {

  static async addShortComment(content,bookId){
    const comment = await BookComment.findOne({
      where:{
        content,
        book_id:bookId
      }
    })
    if(!comment){
      return await BookComment.create({
        content,
        book_id:bookId,
        nums:1
      })
    }else{
      return await comment.increment('nums',{by:1})
    }
  }

  static async getAllComments(book_id){
    const comments = await BookComment.findAll({
      where:{
        book_id
      }
    })
    return comments
  }

  toJSON(){
    return {
      content:this.getDataValue('content'),
      nums:this.getDataValue('nums')
    }
  }
}

BookComment.init({
  content:{
    type:Sequelize.STRING,
  },
  nums:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  book_id:{
    type:Sequelize.STRING
  }
},{
  sequelize,
  tableName:'book-comment'
})

module.exports = {
  BookComment
}