const express = require('express')
const app = express()
const mongoose = require('mongoose')
const impactsAnalysis = require('./datascraper/analysis')
const scraper = require('./datascraper/scraper')
const mainRoutes = require('./routes/routesMain')


scraper()
.then(data => impactsAnalysis(data))
.catch(console.error())

app.set('view engine', 'ejs')

app.use(express.static('public'))



app.use('/', mainRoutes)
app.use('/resources/', mainRoutes)



app.listen(process.env.PORT, ()=> {
   console.log('Server is running!')
})