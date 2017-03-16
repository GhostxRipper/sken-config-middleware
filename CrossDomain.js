/* Public Class declaration */
class Vendor {
  static init () { return Vendor; }
  static get () { return allowMiddleware; }
}

module.exports = Vendor;

/* Public methods definitions */

const allowMiddleware = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization');

  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
  } else {
    next();
  }
};
