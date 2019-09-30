const { wrap } = require('async-middleware');

const loadPage = require('./commands/load-page');
const loadPageReservationHistories = require('./commands/load-page-reservation-histories');

module.exports = (router, middlewares = []) => {
  router.get('/crawl-results', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/reservation-histories', middlewares.map(middleware => wrap(middleware)), wrap(loadPageReservationHistories));
  return router;
};
