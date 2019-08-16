const moment = require('moment');

const { getAllCrawlResults } = require('../repository');
const { getAllHotelWithHotelRoomTypes } = require('../../hotel/repository');
const { getAllSites } = require('../../site/repository');
const dateTimeUtil = require('../../util/datetime-util');
const arrayUtil = require('../../util/array-util');
const crawlResultService = require('../service');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageCrawlResults(req, res) {
  const hotelData = await getAllHotelWithHotelRoomTypes({});
  const siteData = await getAllSites({});
  // console.log(hotelData);
  const conditions = JSON.parse(JSON.stringify(req.query));
  const { crawl_created_at,
    start_date,
    end_date,
    hotel_id
  } = conditions;
  let data = [];
  let hotelRoomTypeSeparateSalesValue = [],
      stayNumberSeparateAverageSalesValue = [],
      weekdayHotelRoomTypeSeparateAverageSalesValue = [],
      stayNumberSeparateRemainRooms = [],
      smokingStateSeparateRemainRooms= [];
  const initData = dateTimeUtil
    .getDays(start_date, end_date)
    .map(day => ({ sales_value: '0', remain_rooms: '0', date: day }));
  const promise = [];

  try {
    if (crawl_created_at && start_date && end_date) {
      const hotel = hotelData.data.filter(hd => parseInt(hd.id) === parseInt(hotel_id))[0];
      if (conditions.hotel_room_type_id) {
        const hotelRoomType = hotel.hotel_room_types
          .filter(hrt1 => parseInt(conditions.hotel_room_type_id) === parseInt(hrt1.data.id))[0];

        const obj = {};
        obj.label = hotelRoomType.data.id + '. ' + hotelRoomType.data.name;
        obj.stay_numbers = hotelRoomType.data.stay_numbers;
        obj.data = await getAllCrawlResults(conditions);
        data.push(obj);
      } else {
        hotel.hotel_room_types.forEach(hrt2 => {
          conditions.hotel_room_type_id = hrt2.data.id;
          promise.push(
            getAllCrawlResults(conditions)
              .then(res => ({ label: hrt2.data.id + '. ' + hrt2.data.name, stay_numbers: hrt2.data.stay_numbers, data: res }))
          );
        });
        data = await Promise.all(promise);
      }

      // rewrite data
      data.forEach(elem => {
        const tmp = elem.data
          .map(e => ({ sales_value: e.sales_value ? e.sales_value : '0', remain_rooms: e.remain_rooms ? e.remain_rooms : '0', date: moment(e.date).format("YYYY-MM-DD")}));
        elem.data = arrayUtil.mergeArray(initData, tmp, "date")
          .sort((a,b) => a.date > b.date ? 1 : -1);
      });

      // init data
      hotelRoomTypeSeparateSalesValue = crawlResultService.makeHotelRoomTypeSeparateSalesValue(data);
      stayNumberSeparateAverageSalesValue = crawlResultService.makeStayNumberSeparateAverageSalesValue(data);
      weekdayHotelRoomTypeSeparateAverageSalesValue = crawlResultService.makeWeekdayHotelRoomTypeSeparateAverageSalesValue(data);
      stayNumberSeparateRemainRooms = crawlResultService.makeStayNumberSeparateRemainRooms(data);
      smokingStateSeparateRemainRooms = crawlResultService.makeSmokingStateSeparateRemainRooms(data);
      // console.log(data[0], data[2]);
    }
  } catch (error) {
    console.log(error);
    req.session.messages = { errors: { databaseError: FETCH_INFO_ERROR_MESSAGE  } }; 
  }
  res.locals.query = req.query;
  res.render('pages/crawl-results', {
    hotelRoomTypeSeparateSalesValue,
    stayNumberSeparateAverageSalesValue ,
    weekdayHotelRoomTypeSeparateAverageSalesValue,
    stayNumberSeparateRemainRooms,
    smokingStateSeparateRemainRooms,
    hotelData: hotelData.data,
    siteData: siteData.data,
    initData,
  });
}

module.exports = loadPageCrawlResults;
