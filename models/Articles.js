const mongoose = require('mongoose')
const Schema = mongoose.Schema


const articlesSchema = new Schema({
   image: {
      type: String
   },
   title: {
      type: String
   },
   summary: {
      type: String
   },
   source: {
      type: String
   },
   link: {
      type: String
   },
   date: {
      type: String
   }
})

                                                          // collection name
module.exports = mongoose.model('Article', articlesSchema,'Impacts')