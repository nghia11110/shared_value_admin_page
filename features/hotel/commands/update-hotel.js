const { updateHotel: updateHotelRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateHotel(req, res) {
  let hotel = {};
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    hotel = await updateHotelRepo({ ...req.body });
  } catch (error) {
    console.log(error);
    hotel = error;
  }

  if (hotel.id) {
    req.session.messages = { success: profileSuccessMessage };
    res.redirect('/hotels');
    return;
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;
  req.session.messages = { errors: { databaseError } };
  res.redirect('/hotel/edit');
}

module.exports = updateHotel;
