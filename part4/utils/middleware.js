const logger = require('./logger');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  if (request.method !== 'GET') {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    } else {
      response.status(401).json({ error: 'token missing or invalid' });
    }
  }

  next();
};

const userExtractor = (request, response, next) => {
  if (request.method !== 'GET') {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
      const userObjectId = new mongoose.Types.ObjectId(decodedToken.id);
      request.user = userObjectId;
    } else {
      response.status(401).json({ error: 'token missing or invalid' });
    }
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
