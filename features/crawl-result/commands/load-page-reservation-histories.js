const moment = require('moment');

const { getAllCrawlResultsByCrawlDate } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');
const dateTimeUtil = require('../../util/datetime-util');
const arrayUtil = require('../../util/array-util');
const crawlResultService = require('../service');

const { FETCH_INFO_ERROR_MESSAGE, WEEKDAY_ARRAY } = require('../constants');

async function loadPageReservationHistories(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  // console.log(req.query);
  const conditions = JSON.parse(JSON.stringify(req.query));
  const { start_date,
    end_date,
    hotel_id,
  } = conditions;
  let data = {};
  let reservationHistoriesData = [];
  const initData = dateTimeUtil
    .getDays(start_date, end_date)
    .map(day => ({ sales_value: '0', remain_rooms: '0', date: day }));

  try {
    if (start_date && end_date) {
      currentDate = start_date;
      while (moment(currentDate, "YYYY-MM-DD") <= moment(end_date, "YYYY-MM-DD")) {
        conditions.crawl_created_at = currentDate;
        data[currentDate] = await getAllCrawlResultsByCrawlDate(conditions);
        currentDate = moment(currentDate, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
      }
      // console.log(data);
      // init data
      reservationHistoriesData = crawlResultService.makeReservationHistoriesData(data);
      // console.log(data[0], data[2]);
    }
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }

  // parse req.query to view
  res.locals.query = req.query;

  // render view
  res.render('pages/reservation-histories', {
    reservationHistoriesData,
    hotelData: hotelData.data,
    siteData: siteData.data,
    initData,
  });
}

module.exports = loadPageReservationHistories;
