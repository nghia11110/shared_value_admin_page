const { wrap } = require('async-middleware');

const requestBodyValidation = require('./commands/verify-request-body');
const updateHotel = require('./commands/update-hotel');
const createHotel = require('./commands/create-hotel');
const deleteHotel = require('./commands/delete-hotel');

const loadPage = require('./commands/load-page');
const loadPageAddHotel = require('./commands/load-page-add-hotel');
const loadPageEditHotel = require('./commands/load-page-edit-hotel');
const loadPageDeleteHotel = require('./commands/load-page-delete-hotel');

module.exports = (router, middlewares = []) => {
  router.get('/hotels/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/hotel/add', wrap(loadPageAddHotel));
  router.get('/hotel/edit', wrap(loadPageEditHotel));
  router.get('/hotel/delete', wrap(loadPageDeleteHotel));

  router.post('/hotel/edit', /*wrap(requestBodyValidation), */wrap(updateHotel));
  router.post('/hotel/add', /*wrap(requestBodyValidation), */wrap(createHotel));
  router.post('/hotel/delete', /*wrap(requestBodyValidation), */wrap(deleteHotel));

  return router;
};
