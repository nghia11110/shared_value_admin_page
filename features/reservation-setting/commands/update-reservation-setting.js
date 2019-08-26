const { updateReservationSetting: updateReservationSettingRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateReservationSetting(req, res) {
  let reservationSetting = {};
  try {
    reservationSetting = await updateReservationSettingRepo(req.body);
    if (reservationSetting.id) {
      req.session.messages = { 'success': UPDATE_INFO_SUCCESS_MESSAGE };
      res.redirect('/reservation-settings');
      return;
    }
  } catch (error) {
    console.log(error);
    reservationSetting = error;
    const { code } = reservationSetting;
    const databaseError = UPDATE_INFO_ERROR_MESSAGE;
    req.session.messages = { errors: { databaseError } };
    res.redirect('/reservation-settings');
  }
}

module.exports = updateReservationSetting;
