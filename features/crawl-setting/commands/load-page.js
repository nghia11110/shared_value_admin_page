const { getAllCrawlSettings } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlSettings(req, res) {
  const perPage = 10;
  const page = req.params.page || 1;
  const searchHotelName = req.query.search_hotel_name ? req.query.search_hotel_name : '';
  const condition = { page, perPage, searchHotelName};
  let data = {};
  try {
    data = await getAllCrawlSettings(condition);
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.render('pages/crawl-settings', { 'crawlSettings': data.data, 'current': data.current_page, 'pages': Math.ceil(data.total / data.per_page), 'per_page': data.per_page, searchHotelName });
}

module.exports = loadPageCrawlSettings;
