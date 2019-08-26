const { wrap } = require('async-middleware');

const searchReservation = require('./reservation/search-reservation');

module.exports = router => {
  router.post('/api/reservation', wrap(searchReservation));

  return router;
};
