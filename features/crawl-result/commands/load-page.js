const { getAllCrawlResults } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlResults(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  console.log(req.query);
  const searchHotelName = req.query.search_hotel_name ? req.query.search_hotel_name : '';
  const condition = { searchHotelName };
  let data = {};
  try {
    data = await getAllCrawlResults(condition);
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.render('pages/crawl-results', { 'crawlResults': data.data, hotelData: hotelData.data, siteData: siteData.data });
}

module.exports = loadPageCrawlResults;
