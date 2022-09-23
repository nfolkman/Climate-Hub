
const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' })


/*** build out DB connection function ***/

mongoose.connect(process.env.DB_STRING, {
         useNewUrlParser: true,
       })
      .then(()=>console.log(`MongoDB Connected`))
      .catch(err => console.log(err))
      
      
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
