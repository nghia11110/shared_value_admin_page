const { getAllHotels } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageHotels(req, res) {
  let perPage = 20;
  let page = req.params.page || 1;
  let condition = { page, perPage};
  let hotels = {};
  try {
    hotels = await getAllHotels(condition);
  } catch (getUserError) {
    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }
  res.render('pages/hotels', { hotels, 'current': page, 'pages': Math.ceil(hotels.length / perPage) });
}

module.exports = loadPageHotels;
