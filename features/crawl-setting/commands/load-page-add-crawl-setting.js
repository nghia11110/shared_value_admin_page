const { getAllHotels } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');
const { maxAdult, maxRoom, crawlConditonMatrix } = require('../constants');

async function loadPageAddCrawlSetting(req, res) {
  const hotelData = await getAllHotels({});
  const siteData = await getAllSites({});

  res.render('pages/crawl-setting/add', { hotelData: hotelData.data, siteData: siteData.data, maxAdult, maxRoom, crawlConditonMatrix });
}

module.exports = loadPageAddCrawlSetting;
