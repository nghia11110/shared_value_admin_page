const { getAllCrawlResults } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlResults(req, res) {
  const searchHotelName = req.query.search_hotel_name ? req.query.search_hotel_name : '';
  const condition = { searchHotelName };
  let data = {};
  try {
    data = await getAllCrawlResults(condition);
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.render('pages/crawl-results', { 'crawlResults': data.data, 'current': data.current_page, 'pages': Math.ceil(data.total / data.per_page), 'per_page': data.per_page, searchHotelName });
}

module.exports = loadPageCrawlResults;
