class DatetimeUtil {
   formatDate(day) {
    const str = String(day.getFullYear()) + '-' + String(day.getMonth() + 1) + '-' + String(day.getDate());
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
