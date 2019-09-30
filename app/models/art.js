const { flatten } = require('lodash')
const { Op } = require('sequelize')
const { Movie,Sentence,Music } = require('./classic')
const { Favor } = require('./favor')

class Art {

  constructor(art_id,type){
    this.art_id = art_id
    this.type = type
  }

  async getDataDetail(uid){

    const art = await Art.getData(this.art_id,this.type)

    if(!art){
      throw new global.errors.NotFound()
    }

    const like = await Favor.userLikeStatus(uid,this.art_id,this.type)

    return {
      detail:art,
      like_status:like
    }
  }

  static async getData(art_id,type){
    let result = null
    const finder = {
      where:{
        id:art_id
      }
    }
    switch (type) {
      case 100:
        result = await Movie.findOne(finder)
        break;
      case 200:
        result = await Sentence.findOne(finder)
        break;
      case 300:
        result = await Music.findOne(finder)
        break;
      case 400:
        break;
      default:
        break;
    } 
    return result
  }

  static async handleUserFavorsList(list){

    // 提取出 ids
    let artList = {
      100:[],
      200:[],
      300:[]
    }
    let userFavorsList = []
    for (const art of list) {
      artList[art.type].push(art.art_id)
    }

    // 循环获取数据
    for (const key in artList) {
      if(artList[key].length === 0){
        continue
      }
      userFavorsList.push(await Art._getArtDetailByIds(artList[key],parseInt(key)))
    }
    
    // 使用 loadash 的 flatten 函数转化为一维数组
    userFavorsList = flatten(userFavorsList)
    return userFavorsList
  }

  static async _getArtDetailByIds(ids,type){
    let result = null
    const finder = {
      where:{
        id:{
          [Op.in]:ids
        }
      }
    }
    switch (type) {
      case 100:
        result = await Movie.findAll(finder)
        break;
      case 200:
        result = await Sentence.findAll(finder)
        break;
      case 300:
        result = await Music.findAll(finder)
        break;
      case 400:
        break;
      default:
        break;
    }
    return result
  }
}

module.exports = {
  Art
}