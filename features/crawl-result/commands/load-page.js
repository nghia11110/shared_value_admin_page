const { getAllCrawlResults } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlResults(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  // console.log(req.query);
  let data = {};
  try {
    data = await getAllCrawlResults(req.query);
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.locals.query = req.query;
  res.render('pages/crawl-results', { crawlResults: data, hotelData: hotelData.data, siteData: siteData.data });
}

module.exports = loadPageCrawlResults;
