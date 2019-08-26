const { getAllHotels } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');

async function loadPageAddReservationSetting(req, res) {
  const hotelData = await getAllHotels({});
  const siteData = await getAllSites({});

  res.render('pages/reservation-setting/add', { hotelData: hotelData.data, siteData: siteData.data });
}

module.exports = loadPageAddReservationSetting;
