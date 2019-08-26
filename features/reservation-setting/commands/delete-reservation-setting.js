const { deleteReservationSetting: deleteReservationSettingRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function deleteReservationSetting(req, res) {
  let reservationSetting = {};
  const { id } = req.body;
  try {
    reservationSetting = await deleteReservationSettingRepo({ id });

    if (reservationSetting.id) {
      req.session.messages = { success: UPDATE_INFO_SUCCESS_MESSAGE };
      res.redirect('/reservation-settings');
      return;
    }
  } catch (error) {
    console.log(error);
    reservationSetting = error;
    const databaseError = UPDATE_INFO_ERROR_MESSAGE;
    req.session.messages = { errors: { databaseError } };
    res.redirect('/reservation-settings');
  }
}

module.exports = deleteReservationSetting;
