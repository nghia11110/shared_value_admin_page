const repository = require('../repository');

async function createHotel(req, res) {
  let hotel = {};
  const registerSuccessMessage = '追加しました！';
  try {
    hotel = await repository.createHotel(req.body);
  } catch (error) {
    hotel = error;
  }
  if (hotel.id) {
    req.session.messages = { success: registerSuccessMessage };
    res.redirect('/hotels');
    return;
  }
  const { code } = hotel;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  req.session.messages = { databaseError };
  res.redirect('/hotel/add');
}

module.exports = createHotel;
