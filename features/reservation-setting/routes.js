const { wrap } = require('async-middleware');

const validateRegisterReservationSettingPayload = require('./commands/verify-request-body');
const updateReservationSetting = require('./commands/update-reservation-setting');
const createReservationSetting = require('./commands/create-reservation-setting');
const deleteReservationSetting = require('./commands/delete-reservation-setting');

const loadPage = require('./commands/load-page');
const loadPageAddReservationSetting = require('./commands/load-page-add-reservation-setting');
const loadPageEditReservationSetting = require('./commands/load-page-edit-reservation-setting');
const loadPageDeleteReservationSetting = require('./commands/load-page-delete-reservation-setting');

module.exports = (router, middlewares = []) => {
  router.get('/reservation-settings/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/reservation-setting/add', wrap(loadPageAddReservationSetting));
  router.get('/reservation-setting/edit', wrap(loadPageEditReservationSetting));
  router.get('/reservation-setting/delete', wrap(loadPageDeleteReservationSetting));

  router.post('/reservation-setting/edit', wrap(validateRegisterReservationSettingPayload), wrap(updateReservationSetting));
  router.post('/reservation-setting/add', wrap(validateRegisterReservationSettingPayload), wrap(createReservationSetting));
  router.post('/reservation-setting/delete', wrap(deleteReservationSetting));

  return router;
};
