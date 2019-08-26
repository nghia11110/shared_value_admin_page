const repository = require('../../reservation-setting/repository');

async function searchReservation(req, res) {
  let reservation = {};
  try {
    reservation =await repository.searchReservation(req.body);
    if (reservation && reservation.id) {
      res.json({reservationCode: reservation.reservation_code});
    } else {
      res.json({});
    }
    return;
  } catch (e) {
    // console.log(e);
    res.status(e.status).send(e.message);
  }
}

module.exports = searchReservation;
