const logger = require('./logger.js')

const requestLogger = (request, response, next) => {
	logger.info(request.method, request.path)
	if (request.body) logger.info(request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) =>
	response.status(404).send({ error: 'Unknown endpoint' })

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
}
