class ArrayUtil {
  /*
    a = [{sale_values: 10, date: '2019-08-01'}, {sale_values: 20, date: '2019-08-02'}]
    b = [{sale_values: 100, date: '2019-08-01'}]
    p = 'date'
    -> output: [{sale_values: 100, date: '2019-08-01'}, {sale_values: 20, date: '2019-08-02'}]
  */
  mergeArray(a, b, p) {
    return a.filter(aa => ! b.find ( bb => aa[p] == bb[p] )).concat(b);
  }
}

module.exports = new ArrayUtil();
