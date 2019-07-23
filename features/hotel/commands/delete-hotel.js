const { deleteHotel: deleteHotelRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function deleteHotel(req, res) {
  let hotel = {};
  const { id } = req.body;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    hotel = await deleteHotelRepo({ id });
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
  res.redirect('/hotel/delete');
}

module.exports = deleteHotel;
