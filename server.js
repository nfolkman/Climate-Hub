const express = require('express')
const app = express()
const mongoose = require('mongoose')
const nodeCron = require('node-cron')
const impactsAnalysis = require('./datascraper/analysis')
const scraper = require('./datascraper/scraper')
const mainRoutes = require('./routes/routesMain')

               // DO NOT FORGET SPACES BETWEEN ASTRISKS
nodeCron.schedule('*/15 * * * *', () => {
   scraper()
   .then(data => {impactsAnalysis(data)
})
.catch(console.error())
})







app.set('view engine', 'ejs')

app.use(express.static('public'))



app.use('/', mainRoutes)
app.use('/resources/', mainRoutes)



app.listen(process.env.PORT, ()=> {
   console.log('Server is running!')
})