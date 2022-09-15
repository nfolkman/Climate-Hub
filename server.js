const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/routesMain')


require('dotenv').config({ path: './.env' })


connectDB()


app.set('view engine', 'ejs')

app.use(express.static('public'))



app.use('/', mainRoutes)



app.listen(process.env.PORT, ()=> {
   console.log('Server is running!')
})