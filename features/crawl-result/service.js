const { STAY_NUMBER_TEXT, SMOKING, NO_SMOKING, SMOKING_STATE } = require('./constants');
const dateTimeUtil = require('../util/datetime-util');

class CrawlResultService {
  // 部屋タイプ別金額 data
  makeHotelRoomTypeSeparateSalesValue(data) {
    const hotelRoomTypeSeparateSalesValue = [];

    data.forEach(el => {
      hotelRoomTypeSeparateSalesValue.push({
        label: el.label,
        data: el.data.map(e => e.sales_value),
      });
    });

    return hotelRoomTypeSeparateSalesValue;
  }

  // 宿泊可能人数別平均金額 data
  makeStayNumberSeparateAverageSalesValue(data) {
    const stayNumberSeparateAverageSalesValue = [];
    let count = [];
    data.forEach(el => {
      const obj = {};

      obj.label = STAY_NUMBER_TEXT + el.stay_numbers;
      obj.data = el.data.map(e => e.sales_value);
      if (typeof stayNumberSeparateAverageSalesValue[el.stay_numbers] === 'undefined') {
        stayNumberSeparateAverageSalesValue[el.stay_numbers] = obj;
        count[el.stay_numbers] = obj.data.map(e => e !== '0' ? 1 : 0);
      } else {
        const tmp = obj.data.map((num, idx) => parseInt(num) + parseInt(stayNumberSeparateAverageSalesValue[el.stay_numbers].data[idx]));
        obj.data.forEach((e, idx) => {
          if (e !== '0') {
            count[el.stay_numbers][idx]++;
          }
        });
        stayNumberSeparateAverageSalesValue[el.stay_numbers].data = tmp;
      }
    });

    stayNumberSeparateAverageSalesValue.forEach((el, idx1) => {
      el.data = el.data.map((e, idx2) => count[idx1][idx2] > 0 ? Math.round(e/count[idx1][idx2]) : 0);
    });

    return stayNumberSeparateAverageSalesValue.filter(el => true);
  }

  // 曜日別平均金額
  makeWeekdayHotelRoomTypeSeparateAverageSalesValue(data) {
    const weekdayHotelRoomTypeSeparateAverageSalesValue = [];

    data.forEach(el => {
      const obj = {};
      const count = [];

      obj.label = el.label;
      obj.data = [];
      el.data.forEach(e => {
        const weekDay = dateTimeUtil.getWeekday(e.date);

        if (typeof obj.data[weekDay] === 'undefined') {
          obj.data[weekDay] = parseInt(e.sales_value);
          count[weekDay] = 1;
        } else {
          obj.data[weekDay] += parseInt(e.sales_value);
          count[weekDay]++;
        }
      });
      obj.data = obj.data.map((o,idx) => Math.round(o/count[idx]));

      weekdayHotelRoomTypeSeparateAverageSalesValue.push(obj);
    });

    return weekdayHotelRoomTypeSeparateAverageSalesValue;
  }

  // 宿泊可能人数別残室数
  makeStayNumberSeparateRemainRooms(data) {
    const stayNumberSeparateRemainRooms = [];

    data.forEach(el => {
      const obj = {};

      obj.label = STAY_NUMBER_TEXT + el.stay_numbers;
      obj.data = el.data.map(e => e.remain_rooms);
      if (typeof stayNumberSeparateRemainRooms[el.stay_numbers] === 'undefined') {
        stayNumberSeparateRemainRooms[el.stay_numbers] = obj;
      } else {
        const tmp = obj.data.map((num, idx) => parseInt(num) + parseInt(stayNumberSeparateRemainRooms[el.stay_numbers].data[idx]));

        stayNumberSeparateRemainRooms[el.stay_numbers].data = tmp;
      }
    });
    return stayNumberSeparateRemainRooms.filter(el => true);
  }

  // 禁煙喫煙別残室数
  makeSmokingStateSeparateRemainRooms(data) {
    const smokingStateSeparateRemainRooms = [];

    data.forEach(el => {
      const obj = {};

      obj.label = el.label.includes(NO_SMOKING) ? NO_SMOKING : SMOKING;
      obj.data = el.data.map(e => e.remain_rooms);
      if (typeof smokingStateSeparateRemainRooms[SMOKING_STATE[obj.label]] === 'undefined') {
        smokingStateSeparateRemainRooms[SMOKING_STATE[obj.label]] = obj;
      } else {
        const tmp = obj.data.map((num, idx) => parseInt(num) + parseInt(smokingStateSeparateRemainRooms[SMOKING_STATE[obj.label]].data[idx]));

        smokingStateSeparateRemainRooms[SMOKING_STATE[obj.label]].data = tmp;
      }
    });
    return smokingStateSeparateRemainRooms;
  }
}

module.exports = new CrawlResultService();