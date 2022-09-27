const Article = require('../models/Articles')
// Home route controller

module.exports = {
   getIndex: (req,res) => {
      
      // let articles = [{'title': 'Climate Change Is Real'},{'title': 'Temperatures Change Over Time'},{'title': 'Nonprofits pay Texas farmers to not water crops during drought'}]

      Article.find({}, function(err, articles) {
         res.render('index', {articlesList: articles})
      })
   },
   getResources: (res,req) => {
      res.render('resources')
   }
}