const { Sequelize, Model } = require('sequelize')
const axios = require('axios')
const util = require('util')
const { sequelize } = require('../../core/db')

class Book extends Model {
  constructor(id){
    super()
    this.id = id
  }

  async getDetail(){
    const { detailUrl } = global.config.yushu
    const url = util.format(detailUrl,this.id)
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new global.errors.NotFound()
    }
    return result.data
  }

  static async searchBook(q,start,count,summary=1){
    const { keywordUrl } = global.config.yushu
    const url = util.format(keywordUrl,encodeURI(q),start,count,summary)
    const result = await axios.get(url)
    if(result.status !== 200){
      throw new global.errors.NotFound()
    }
    return result.data
  }
}

Book.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true
  },
  fav_nums:{
    type:Sequelize.INTEGER,
    default:0
  }
},{
  sequelize,
  tableName:'book'
})

module.exports = {
  Book
}