const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image:Sequelize.STRING,
  content:Sequelize.STRING,
  pubdate:Sequelize.DATEONLY,
  fav_nums:Sequelize.INTEGER,
  title:Sequelize.STRING,
  type:Sequelize.TINYINT
}

class Movie extends Model {

}

Movie.init(classicFields,{
  sequelize,
  tableName:'Movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields,{
  sequelize,
  tableName:'Sentence'
})

class Music extends Model {

}

Music.init(
  Object.assign(classicFields,{
    url:Sequelize.STRING
  }),{
  sequelize,
  tableName:'Music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}