const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')


// main route
router.get('/', homeController.getIndex)
router.get('/resources/', homeController.getResources)


module.exports = router