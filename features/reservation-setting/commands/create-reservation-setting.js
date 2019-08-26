const repository = require('../repository');

async function createReservationSetting(req, res) {
  let reservationSetting = {};
  const registerSuccessMessage = '追加しました！';
  try {
    reservationSetting = await repository.createReservationSetting(req.body);
    if (reservationSetting.id) {
      req.session.messages = { 'success': registerSuccessMessage };
      res.redirect('/reservation-settings');
      return;
    }
  } catch (error) {
    console.log(error);
    reservationSetting = error;
    const { code } = reservationSetting;
    const databaseError =
      code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
    req.session.messages.errors = { databaseError };
    res.redirect('/reservation-setting/add');
  }
}

module.exports = createReservationSetting;
