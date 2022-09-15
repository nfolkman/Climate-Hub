const mongoose = require('mongoose')
const impactsAnalysis = require('../datascraper/analysis')
const scraper = require('../datascraper/scraper')

/*** build out DB connection function ***/

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.DB_STRING, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       })
      console.log(`MongoDB Connected: ${conn.connection.host}`)
      
      await scraper()
      await impactsAnalysis()

     } catch (err) {
       console.error(err)
       process.exit(1)
   }
}

module.exports = connectDB
