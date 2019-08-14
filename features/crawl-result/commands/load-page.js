const moment = require('moment');

const { getAllCrawlResults } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');
const dateTimeUtil = require('../../util/datetime-util');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlResults(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  // console.log(hotelData);
  const conditions = req.query;
  const { crawl_created_at,
    start_date,
    end_date,
    hotel_id
  } = conditions;
  let data = [];
  const promise = [];
  try {
    if (crawl_created_at && start_date && end_date) {
      const hotel = hotelData.data.filter(hd => parseInt(hd.id) === parseInt(hotel_id))[0];
      if (conditions.hotel_room_type_id) {
        const hotelRoomType = hotel.hotel_room_types
          .filter(hrt1 => parseInt(conditions.hotel_room_type_id) === parseInt(hrt1.data.id))[0];

        const obj = {};
        obj[hotelRoomType.data.name] = await getAllCrawlResults(conditions);
        data.push(obj);
      } else {
        hotel.hotel_room_types.forEach(hrt2 => {
          conditions.hotel_room_type_id = hrt2.data.id;
          promise.push(
            getAllCrawlResults(conditions)
              .then(res => {
                const obj = {};
                obj[hrt2.data.name] = res;
                return obj;
              })
          );
        });
        data = await Promise.all(promise);
      }
      const initData = dateTimeUtil
        .getDays(start_date, end_date)
        .map(day => {
          const obj = {};
          obj.sales_value = 0;
          obj.date= day;
          return obj;
        });
      console.log(initData);
      data.forEach(elem => {
        var merge = (a, b, p) => a.filter(aa => ! b.find ( bb => aa[p] === moment(bb[p])).format("YYYY-MM-DD")).concat(b);
        merge(initData, elem[Object.keys(elem)[0]], "date")
        console.log(elem[Object.keys(elem)[0]]);
      });
    }
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.locals.query = req.query;
  res.render('pages/crawl-results', { crawlResults: data, hotelData: hotelData.data, siteData: siteData.data });
}

module.exports = loadPageCrawlResults;
