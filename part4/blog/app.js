const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const blogRouter = require('./controller/blogs.js')
const middleware = require('./utils/middleware.js')

const app = express()

logger.info(`Connecting to MongoDB: ${config.MONGODB_URI}`)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => logger.info('Connected to MongoDB'))
	.catch((error) =>
		logger.error(`Error connecting to MongoDB: ${error.message}`),
	)

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
