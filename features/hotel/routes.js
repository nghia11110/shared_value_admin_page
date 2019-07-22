const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateHotelInfo = require('./commands/update-hotel-info');

const loadPage = require('./commands/load-page');

module.exports = (router, middlewares = []) => {
  router.get('/hotels/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));

  router.post('/update-hotel-info', wrap(requestBodyValidation), wrap(updateHotelInfo));

  return router;
};
