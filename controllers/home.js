const ArticlesModel = require('../models/Articles')
// Home route controller

module.exports = {
   getIndex: (req,res) => {
      res.render('index')
   },
   getResources: (res,req) => {
      res.render('resources')
   }
}