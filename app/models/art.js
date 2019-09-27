const { Movie,Sentence,Music } = require('./classic')

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
}

module.exports = {
  Art
}