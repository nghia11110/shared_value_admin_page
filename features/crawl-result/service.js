const moment = require('moment');

const { STAY_NUMBER_TEXT,
  SMOKING,
  NO_SMOKING,
  SMOKING_STATE,
  PLAN_1,
  PLAN_2,
  PLAN_0,
  PLAN_LIST,
  WEEKLY_COUNT,
} = require('./constants');
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
          count[weekDay] = e.sales_value !== '0' ? parseInt(e.number_booking) : 0;
        } else {
          obj.data[weekDay] += parseInt(e.sales_value);
          if (e.sales_value !== '0') {
            count[weekDay] += parseInt(e.number_booking);
          }
        }
      });
      obj.data = obj.data.map((o,idx) => count[idx] > 0 ? Math.round(o/count[idx]) : 0);

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

  /* reservation histories
  * input: data
  * output: [
      {
        data: [ 2000, 0 ],
        suffixExtraInfo: [ 2, 0 ],
        label: '2019-07-17'
      },
      {
        data: [ 5000, 5000 ],
        suffixExtraInfo: [ 1, 1 ],
        label: '2019-07-18'
      },
      {
        data: [ 0, 7000 ],
        suffixExtraInfo: [ 0, 1 ],
        label: '2019-07-19'
      }
    ]
  */
  makeReservationHistoriesData(data) {
    /*data = { '2019-07-16':
            [ { checkin: "2019-07-17T00:00:00.000Z",
                 price_total: 1000,
                 remain_rooms: 3 },
               { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 5000,
                 remain_rooms: 3 },
               { checkin: "2019-07-19T00:00:00.000Z",
                 price_total: 2000,
                 remain_rooms: 3 }],
            '2019-07-17':
             [ { checkin: "2019-07-17T00:00:00.000Z",
                 price_total: 1000,
                 remain_rooms: 1 },
               { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 5000,
                 remain_rooms: 2 },
               { checkin: "2019-07-19T00:00:00.000Z",
                 price_total: 2000,
                 remain_rooms: 1 } ],
            '2019-07-18':
              [ { checkin: "2019-07-17T00:00:00.000Z",
                 price_total: 1000,
                 remain_rooms: 5 },
               { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 5000,
                 remain_rooms: 1 },
               { checkin: "2019-07-19T00:00:00.000Z",
                 price_total: 2000,
                 remain_rooms: 2 } ],
          }*/
    const reservationHistories = [];
    const labels = [];
    let currentDate;
    let nextDate;
    const numberDate = Object.keys(data).length;

    Object.keys(data).forEach((key, index) => {
      currentDate = key;
      nextDate = moment(currentDate, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");

      if (data[currentDate].length && data[nextDate] && data[nextDate].length) {
        data[currentDate].forEach((stockInfo) => {
          const stockInfoInNextDate = data[nextDate]
            .filter(ele => moment(ele.checkin, "YYYY-MM-DD").format("YYYY-MM-DD") === moment(stockInfo.checkin, "YYYY-MM-DD").format("YYYY-MM-DD"));
          const obj = {};
          let offset;
          obj.data = [];
          obj.suffixExtraInfo = [];
          for (let i = 0; i < numberDate - 1 ; i++) {
            obj.data[i] = 0;
            obj.suffixExtraInfo[i] = 0;
          }
          obj.label = moment(stockInfo.checkin, "YYYY-MM-DD").format("YYYY-MM-DD");

          if (!stockInfoInNextDate.length || stockInfo.remain_rooms === 0) { // do not have info in next day -> not clear sell room
            offset = 0;                                                      // remain_rooms = 0 -> sell 0 room
          } else {
            offset = stockInfo.remain_rooms - stockInfoInNextDate[0].remain_rooms;
          }
          obj.data[index] = offset * stockInfo.price_total;
          obj.suffixExtraInfo[index] = offset;

          const k = Object.keys(reservationHistories).find(k1 => reservationHistories[k1].label === obj.label);
          if (k !== undefined) {
            reservationHistories[k].data[index] = obj.data[index];
            reservationHistories[k].suffixExtraInfo[index] = obj.suffixExtraInfo[index];
          } else {
            reservationHistories.push(obj);
          }
        });
      }

      if (index < (numberDate - 1)) {
        labels.push(key);
      }
    });
    const sortReservationHistories = reservationHistories.sort((a,b) => moment(a.label, "YYYY-MM-DD") < moment(b.label, "YYYY-MM-DD") ? 1 : -1);

    // console.log(sortReservationHistories);
    return { labels, "datasets": sortReservationHistories };
  }

  /* reservation histories by checkin date
  * input: { '2019-07-17':
             [ { checkin: 2019-07-17T00:00:00.000Z,
                 price_total: 34780,
                 remain_rooms: 2,
                 crawl_created_at: 2019-07-16T19:19:40.000Z },
               { checkin: 2019-07-17T00:00:00.000Z,
                 price_total: 1000,
                 remain_rooms: 1,
                 crawl_created_at: 2019-07-17T19:19:40.201Z },
               { checkin: 2019-07-17T00:00:00.000Z,
                 price_total: 34780,
                 remain_rooms: 2,
                 crawl_created_at: 2019-07-18T19:19:40.201Z } ],
            '2019-07-18':
             [ { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 20000,
                 remain_rooms: 1,
                 crawl_created_at: "2019-07-17T19:19:40.365Z" },
                 { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: null,
                 remain_rooms: 0,
                 crawl_created_at: "2019-07-18T19:19:40.365Z" }
             ],
            }

  * output: [
      {
        data: [ 34780, 0 ],
        suffixExtraInfo: [ 1, 0 ],
        label: '2019-07-16'
      },
      {
        data: [ -10000, 20000 ],
        suffixExtraInfo: [ -1, 1 ],
        label: '2019-07-17'
      }
    ]
  */
  makeReservationHistoriesByCheckinDateData(data) {
    /*data = { '2019-07-17':
             [ { checkin: "2019-07-17T00:00:00.000Z",
                 price_total: 10000,
                 remain_rooms: 3,
                 crawl_created_at: "2019-07-08T19:19:40.000Z",
                 option_condition_text: ' 返金不可 ' },
              { checkin: "2019-07-17T00:00:00.000Z",
                 price_total: 10000,
                 remain_rooms: 2,
                 crawl_created_at: "2019-07-09T19:19:40.201Z",
                 option_condition_text: ' 返金不可' },
             ],
            '2019-07-18':
             [ { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 20000,
                 remain_rooms: 2,
                 crawl_created_at: "2019-07-16T19:19:40.365Z",
                 option_condition_text: null },
               { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 20000,
                 remain_rooms: 1,
                 crawl_created_at: "2019-07-17T19:19:40.365Z",
                 option_condition_text: 'null' },
               { checkin: "2019-07-18T00:00:00.000Z",
                 price_total: 20000,
                 remain_rooms: 2,
                 crawl_created_at: "2019-07-18T19:19:40.365Z",
                 option_condition_text: 'null' },
             ],
            '2019-07-19':
             [ { checkin: "2019-07-19T00:00:00.000Z",
                 price_total: 30000,
                 remain_rooms: 1,
                 crawl_created_at: "2019-05-17T19:19:40.365Z",
                 option_condition_text: ' キャンセル無料 23132 ' },
                 { checkin: "2019-07-19T00:00:00.000Z",
                 price_total: null,
                 remain_rooms: 0,
                 crawl_created_at: "2019-05-18T19:19:40.365Z" }
             ]
           }*/
    const labels = [];
    const reservationHistoriesByCheckinDate = [];
    const numberDate = Object.keys(data).length;

    Object.keys(data).forEach((key, index) => {
      for (let scrapeResultCount = 0; scrapeResultCount < data[key].length; scrapeResultCount++) {
        if (data[key][scrapeResultCount+1]) {
          const obj = {};
          let offset;
          obj.data = [];
          obj.suffixExtraInfo = [];
          obj.playType = [];
          for (let i = 0; i < numberDate; i++) {
            obj.data[i] = 0;
            obj.suffixExtraInfo[i] = 0;
            obj.playType[i] = -1;
          }
          if (data[key][scrapeResultCount-1] &&
              (moment(data[key][scrapeResultCount].crawl_created_at, "YYYY-MM-DD").format("YYYY-MM-DD")
                === moment(data[key][scrapeResultCount-1].crawl_created_at, "YYYY-MM-DD").format("YYYY-MM-DD")
              )
            ) {
            obj.playType[index] = PLAN_LIST[PLAN_0];
          } else if(data[key][scrapeResultCount].option_condition_text) {
            if (data[key][scrapeResultCount].option_condition_text.includes(PLAN_1)) {
              obj.playType[index] = PLAN_LIST[PLAN_1];
            } else if(data[key][scrapeResultCount].option_condition_text.includes(PLAN_2)) {
              obj.playType[index] = PLAN_LIST[PLAN_2];
            }
          }
          obj.label = moment(data[key][scrapeResultCount].crawl_created_at, "YYYY-MM-DD").format("YYYY-MM-DD");
          offset = data[key][scrapeResultCount].remain_rooms - data[key][scrapeResultCount+1].remain_rooms;
          obj.data[index] = offset * data[key][scrapeResultCount].price_total;
          obj.suffixExtraInfo[index] = offset;

          const k = Object.keys(reservationHistoriesByCheckinDate).find(k1 => reservationHistoriesByCheckinDate[k1].label === obj.label);
          if (k !== undefined) {
            reservationHistoriesByCheckinDate[k].data[index] = obj.data[index];
            reservationHistoriesByCheckinDate[k].suffixExtraInfo[index] = obj.suffixExtraInfo[index];
            reservationHistoriesByCheckinDate[k].playType[index] = obj.playType[index];
          } else {
            reservationHistoriesByCheckinDate.push(obj);
          }
        }
      }
      labels.push(key);
    });
    // console.log(labels, reservationHistoriesByCheckinDate);

    const [reservationHistoriesByCheckinDateInPlan, reservationHistoriesByCheckinDatePlanSeparate] = this.makeReservationHistoriesByCheckinDatePlanSeparateData(reservationHistoriesByCheckinDate);
    const reservationHistoriesByCheckinDateWeeklySeparate = this.makeReservationHistoriesByCheckinDateWeeklySeparate(labels, reservationHistoriesByCheckinDate);

    return { labels,
      reservationHistoriesByCheckinDate,
      reservationHistoriesByCheckinDateInPlan,
      reservationHistoriesByCheckinDatePlanSeparate,
      reservationHistoriesByCheckinDateWeeklySeparate,
    };
  }

  makeReservationHistoriesByCheckinDatePlanSeparateData(reservationHistoriesByCheckinDate) {
    const reservationHistoriesByCheckinDateInPlan = {};
    const reservationHistoriesByCheckinDatePlanSeparate = [];

    Object.keys(PLAN_LIST).forEach(key => {
      reservationHistoriesByCheckinDateInPlan[PLAN_LIST[key]] = reservationHistoriesByCheckinDate
      .map((el) => {
        const obj = JSON.parse(JSON.stringify(el));

        for (let i = 0; i < el.playType.length; i++) {
          if (el.playType[i] !== PLAN_LIST[key]) {
            obj.data[i] = 0;
            obj.suffixExtraInfo[i] = 0;
          }
        }

        return obj;
      });
      const reduceObj = {};
      reduceObj.label = key;
      reduceObj.data = [];
      reduceObj.suffixExtraInfo = [];
      reservationHistoriesByCheckinDateInPlan[PLAN_LIST[key]].forEach(el => {
        for (let i = 0; i < el.data.length; i++) {
          if (!reduceObj.data[i]) {
            reduceObj.data[i] = 0;
          }
          if (!reduceObj.suffixExtraInfo[i]) {
            reduceObj.suffixExtraInfo[i] = 0;
          }
          reduceObj.data[i] += el.data[i];
          reduceObj.suffixExtraInfo[i] += el.suffixExtraInfo[i];
        }
      });
      reservationHistoriesByCheckinDatePlanSeparate.push(reduceObj);
    });

    return [reservationHistoriesByCheckinDateInPlan, reservationHistoriesByCheckinDatePlanSeparate];
  }

  makeReservationHistoriesByCheckinDateWeeklySeparate(labels, reservationHistoriesByCheckinDate) {
    const reservationHistoriesByCheckinDateWeeklySeparate = [];

    Object.keys(WEEKLY_COUNT).forEach(key => {
      const obj = {};
      obj.data = [];
      obj.suffixExtraInfo = [];
      for (let i = 0; i < labels.length; i++) {
        obj.data[i] = 0;
        obj.suffixExtraInfo[i] = 0;
      }
      obj.label = key;
      reservationHistoriesByCheckinDateWeeklySeparate[WEEKLY_COUNT[key]] = {
        'new': JSON.parse(JSON.stringify(obj)),
        'cancel': JSON.parse(JSON.stringify(obj)),
      };
    });

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < reservationHistoriesByCheckinDate.length; j++) {
        let count = moment(labels[i]).diff(moment(reservationHistoriesByCheckinDate[j].label), 'weeks');
        while (true) {
          if (reservationHistoriesByCheckinDateWeeklySeparate[count]) {
            if (parseInt(reservationHistoriesByCheckinDate[j].data[i]) > 0) {
              reservationHistoriesByCheckinDateWeeklySeparate[count].new.data[i] += reservationHistoriesByCheckinDate[j].data[i];
              reservationHistoriesByCheckinDateWeeklySeparate[count].new.suffixExtraInfo[i] += reservationHistoriesByCheckinDate[j].suffixExtraInfo[i];
            } else {
              reservationHistoriesByCheckinDateWeeklySeparate[count].cancel.data[i] += reservationHistoriesByCheckinDate[j].data[i];
              reservationHistoriesByCheckinDateWeeklySeparate[count].cancel.suffixExtraInfo[i] += reservationHistoriesByCheckinDate[j].suffixExtraInfo[i];
            }

            break;
          } else {
            count++;
          }
          if (count > 54) { // 54 weeks = 1 year
            count = 54;
          }
        }
      }
    }
    const arr = reservationHistoriesByCheckinDateWeeklySeparate
    .filter(el => true)
    .map(el => ([el.new, el.cancel]));

    const ret = [].concat.apply([],arr);

    return ret;
  }

}

module.exports = new CrawlResultService();