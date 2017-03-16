/* Services requiring */
const moment = require('moment');
const { join } = require('path');

/* Class definition */
class ErrorHandler {
  logError (error, request, response, next) {
    let text = `[${moment().format('YYYY.MM.DD - h:mm:ss')}] - `;
    text += `${error.status || error.statusCode || '_'} - \n\n${error.stack}\n\n`;

    console.log(text);

    next(error);
  }

  errorHandler (error, request, response, next) {
    if (error.message && error.message.match(/(unauthorized|forbidden)/i)) error.status = 403;
    if (error.message && error.message.match(/(not found|notfound)/i)) error.status = 404;
    response.status(error.status || error.statusCode || 500).json({ message: error.message });
  }

  notFoundHandler (request, response, next) {
    response.status(404);

    // respond with html page
    if (request.accepts('html')) {
      response.sendFile(join(__dirname, '/views/404.html'));
      return;
    }

    // respond with json
    if (request.accepts('json')) {
      response.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
    response.type('txt').send('Not found');
  }

  static set (app) {
    let errorHandler = new ErrorHandler();
    app.use(errorHandler.logError);
    app.use(errorHandler.errorHandler);
    app.use(errorHandler.notFoundHandler);
  }
}

/* Exports */
module.exports = ErrorHandler;
