const moment = require('moment');

const { getAllCrawlResultsByCrawlDate, getAllCrawlResultsByCheckinDate } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');
const crawlResultService = require('../service');

const { FETCH_INFO_ERROR_MESSAGE, WEEKDAY_ARRAY, PLAN_LIST } = require('../constants');

async function loadPageReservationHistories(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  // console.log(req.query);
  const conditions = JSON.parse(JSON.stringify(req.query));
  const { start_date,
    end_date,
  } = conditions;
  let data = {};
  let reservationHistoriesData = {"labels": [], "datasets": []};
  let reservationHistoriesByCheckinDateData = {};
  let reservationHistoriesByCheckinDate = {"labels": [], "datasets": []};
  let reservationHistoriesByCheckinDateInPlan = {};
  let reservationHistoriesByCheckinDatePlanSeparate = {"labels": [], "datasets": []};
  let reservationHistoriesByCheckinDateWeeklySeparate = {"labels": [], "datasets": []};

  try {
    if (start_date && end_date) {
      if (conditions.chart_type === 'crawl-results-chart1') {
        let currentDate = start_date;
        while (moment(currentDate, "YYYY-MM-DD") <= moment(end_date, "YYYY-MM-DD").add(1, 'days')) {
          conditions.crawl_created_at = currentDate;
          data[currentDate] = await getAllCrawlResultsByCrawlDate(conditions);
          currentDate = moment(currentDate, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
        }
        // init data
        reservationHistoriesData = crawlResultService.makeReservationHistoriesData(data);
      } else {
        const dataTmp = await getAllCrawlResultsByCheckinDate(conditions);
        let currentDate = start_date;
        while (moment(currentDate, "YYYY-MM-DD") <= moment(end_date, "YYYY-MM-DD")) {
          data[currentDate] = dataTmp.filter(e => moment(e.checkin).format("YYYY-MM-DD") === moment(currentDate).format("YYYY-MM-DD"));
          currentDate = moment(currentDate, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
        }
        // init data
        reservationHistoriesByCheckinDateData = crawlResultService.makeReservationHistoriesByCheckinDateData(data);

        reservationHistoriesByCheckinDate = {
          labels: reservationHistoriesByCheckinDateData.labels,
          datasets: reservationHistoriesByCheckinDateData.reservationHistoriesByCheckinDate,
        };
        reservationHistoriesByCheckinDatePlanSeparate = {
          labels: reservationHistoriesByCheckinDateData.labels,
          datasets: reservationHistoriesByCheckinDateData.reservationHistoriesByCheckinDatePlanSeparate,
        };
        Object.keys(PLAN_LIST).forEach(key => {
          reservationHistoriesByCheckinDateInPlan[key] = {
            labels: reservationHistoriesByCheckinDateData.labels,
            datasets: reservationHistoriesByCheckinDateData.reservationHistoriesByCheckinDateInPlan[PLAN_LIST[key]],
          };
        });
        reservationHistoriesByCheckinDateWeeklySeparate = {
          labels: reservationHistoriesByCheckinDateData.labels,
          datasets: reservationHistoriesByCheckinDateData.reservationHistoriesByCheckinDateWeeklySeparate,
        };
        // console.log(reservationHistoriesByCheckinDateInPlan);
      }
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
    reservationHistoriesByCheckinDate,
    reservationHistoriesByCheckinDatePlanSeparate,
    reservationHistoriesByCheckinDateInPlan,
    reservationHistoriesByCheckinDateWeeklySeparate,
    hotelData: hotelData.data,
    siteData: siteData.data,
  });
}

module.exports = loadPageReservationHistories;
