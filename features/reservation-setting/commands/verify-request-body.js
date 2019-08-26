const constants = require('../constants');

const { NO_INPUT_ERROR } = constants;

async function validateRegisterReservationSettingPayload(req, res, next) {
  let errors;
  if (!req.body['reservation_code']
  	|| !req.body['reservation_guest_first_name']
  	|| !req.body['reservation_guest_last_name']
  	|| !req.body['reservation_start_date']
  	|| !req.body['reservation_end_date']
  	|| !req.body['reservation_guest_phone_number']) {
    errors = NO_INPUT_ERROR;
  }

  if (errors) {
    req.session.messages.errors = { reservation: errors };
    return res.status(400).redirect('/reservation-setting/add');
  }
  return next();
}

module.exports = validateRegisterReservationSettingPayload;
