const { getAllHotels } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');

async function loadPageAddCrawlSetting(req, res) {
  const hotelData = await getAllHotels({});
  const siteData = await getAllSites({});
  const maxAdult = 6;
  const maxRoom = 6;
  const crawlConditonMatrix = [
    [1,0,0,0,0,0],
    [1,0,0,0,0,0],
    [1,0,0,0,0,0],
    [1,1,0,0,0,0],
    [1,1,0,0,0,0],
    [1,1,1,0,0,0]
  ];

  res.render('pages/crawl-setting/add', { hotelData: hotelData.data, siteData: siteData.data, maxAdult, maxRoom, crawlConditonMatrix });
}

module.exports = loadPageAddCrawlSetting;
