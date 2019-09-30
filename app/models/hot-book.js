const { sequelize } = require('../../core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('../models/favor')

class HotBook extends Model {
  static async getAll(){

    let ids = []

    // 根据升序获取所有热门图书
    const books = await HotBook.findAll({
      order:[
        'index'
      ]
    })

    books.forEach(book=>{
      ids.push(book.id)
    })

    // 获取热门图书的点赞数
    const favors = await Favor.findAll({
      // 获取所有被点过赞的热门图书，得到如 [{'art_id_1':xx,'uid':xx},{'art_id_2':xx,'uid':xx},...] 的数据
      where:{
        art_id:{
          [Op.in]:ids,
        },
        type:400
      },
      // 根据 art_id 进行分组，得到如 {'art_id_1':[],'art_id_2':[]} 之类的结构
      group:['art_id'],

      // attributes 可以用来筛选返回的数据的属性 此处只传递 art_id 属性和 count，得到如 {'art_id_1':xx,'count':xx} 的数据结构
      attributes:['art_id', [sequelize.fn('COUNT', '*'), 'count']]
    })

    books.forEach( book => {
      HotBook._getEachBookDetail(book,favors)
    })

    return books
  }

  static _getEachBookDetail(book,favors){
    let count = 0
    favors.forEach(favor => {
      if(book.id == favor.art_id){
        count = favor.get('count')
      }
    })
    book.setDataValue('count',count)
    return book
  }
}

HotBook.init({
  index:Sequelize.INTEGER,
  image:Sequelize.STRING,
  author:Sequelize.STRING,
  title:Sequelize.STRING
},{
  sequelize,
  tableName:'hot-book'
})

module.exports = {
  HotBook
}