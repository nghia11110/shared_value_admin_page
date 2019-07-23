const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateHotelInfo = require('./commands/update-hotel-info');
const createHotel = require('./commands/create-hotel');

const loadPage = require('./commands/load-page');
const loadPageAddHotel = require('./commands/load-page-add-hotel');
const loadPageEditHotel = require('./commands/load-page-edit-hotel');

module.exports = (router, middlewares = []) => {
  router.get('/hotels/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/hotel/add', wrap(loadPageAddHotel));
  router.get('/hotel/edit', wrap(loadPageEditHotel));

  router.post('/update-hotel-info', wrap(requestBodyValidation), wrap(updateHotelInfo));
  router.post('/hotel/add', /*wrap(requestBodyValidation), */wrap(createHotel));

  return router;
};
