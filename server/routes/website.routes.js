

import express from 'express'
import isAuth from '../middleware/isAuth.js'
import {generateWebsite  } from '../controllers/website.controllers.js'

const websiteRouter=express.Router()

websiteRoute.post('/generate',isAuth,generateWebsite)


export default websiteRoute