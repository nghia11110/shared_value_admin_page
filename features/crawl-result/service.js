const { STAY_NUMBER_TEXT, SMOKING, NO_SMOKING } = require('./constants');

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
    data.forEach(el => {
      const obj = {};

      obj.label = STAY_NUMBER_TEXT + el.stay_numbers;
      obj.data = el.data.map(e => e.sales_value);
      if (!stayNumberSeparateAverageSalesValue[el.stay_numbers]) {
        stayNumberSeparateAverageSalesValue[el.stay_numbers] = obj;
      } else {
        const tmp = obj.data.map((num, idx) => parseInt(num) + parseInt(stayNumberSeparateAverageSalesValue[el.stay_numbers].data[idx]));

        stayNumberSeparateAverageSalesValue[el.stay_numbers].data = tmp;
      }
    });

    stayNumberSeparateAverageSalesValue.forEach((el, idx) => {
      el.data = el.data.map(e => Math.round(e/idx));
    });

    return stayNumberSeparateAverageSalesValue.filter(el => true);
  }

  // 曜日別平均金額
  makeWeekdayHotelRoomTypeSeparateAverageSalesValue(data) {
    const weekdayHotelRoomTypeSeparateAverageSalesValue = [];

    return weekdayHotelRoomTypeSeparateAverageSalesValue;
  }

  // 宿泊可能人数別残室数
  makeStayNumberSeparateRemainRooms(data) {
    const stayNumberSeparateRemainRooms = [];

    return stayNumberSeparateRemainRooms;
  }

  // 禁煙喫煙別残室数
  makeSmokingStateSeparateRemainRooms(data) {
    const smokingStateSeparateRemainRooms = [];

    return smokingStateSeparateRemainRooms;
  }
}

module.exports = new CrawlResultService();