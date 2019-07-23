const { getAllHotels } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageHotels(req, res) {
  const perPage = 10;
  const page = req.params.page || 1;
  const condition = { page, perPage};
  let data = {};
  try {
    data = await getAllHotels(condition);
  } catch (error) {
    console.log(error);
    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }
  res.render('pages/hotels', { 'hotels': data.data, 'current': data.current_page, 'pages': Math.ceil(data.total / data.per_page), 'per_page': data.per_page });
}

module.exports = loadPageHotels;
