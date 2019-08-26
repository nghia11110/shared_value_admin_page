const { getAllHotels } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');

async function loadPageEditReservationSetting(req, res) {
  const hotelData = await getAllHotels({});
  const siteData = await getAllSites({});

  res.render('pages/reservation-setting/delete', {
    data: req.query,
    hotelData: hotelData.data,
    siteData: siteData.data,
  });
}

module.exports = loadPageEditReservationSetting;
