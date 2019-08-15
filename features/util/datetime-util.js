class DatetimeUtil {
  formatDate(date) {
    // 01, 02, 03, ... 29, 30, 31
    const dd = String((date.getDate() < 10 ? '0' : '') + date.getDate());
    // 01, 02, 03, ... 10, 11, 12
    const MM = String(((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1));
     // 1970, 1971, ... 2015, 2016, ...
    const yyyy = String(date.getFullYear());

    // const str = String(day.getFullYear()) + '-' + String(day.getMonth() + 1) + '-' + String(day.getDate());
    const str = yyyy + '-' + MM + '-' + dd;
    return str;
  }

  getDays(startDate, endDate) {
    const days = [];
    const startDateD = new Date(startDate);
    const endDateD = new Date(endDate);
    days.push(this.formatDate(startDateD));
    while(startDateD < endDateD) {
      startDateD.setDate(startDateD.getDate() + 1);
      days.push(this.formatDate(startDateD));
    };
    return days;
  }
}

module.exports = new DatetimeUtil();
