const { Movie,Sentence,Music } = require('./classic')
const { flatten } = require('lodash')
const { Op } = require('sequelize')

class Art {
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
    let artList = {
      100:[],
      200:[],
      300:[]
    }
    let userFavorsList = []
    for (const art of list) {
      artList[art.type].push(art.art_id)
    }
    for (const key in artList) {
      if(artList[key].length === 0){
        continue
      }
      userFavorsList.push(await Art._getArtDetailByIds(artList[key],parseInt(key)))
    }
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
}

module.exports = {
  Art
}