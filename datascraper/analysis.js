const data = require('./scraper')


   // pass data from scraper into model
   const impactsAnalysis = async data => {
      try{
         const Articles = require('../models/Articles')
         
         
      //To replace all existing docs you can do this

      await Articles.deleteMany({});


      //Then this will create the new documents, thus replacing all documents within the database with the new data :)

      return Articles.create(data)
         

      }catch(err) {
         console.error(err)
      }
   }

   module.exports = impactsAnalysis