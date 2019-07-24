function mergeObjectWithSameKeyInArray(arr, compareKeyList, convertToArrayList) {
  let merged = [];

  arr.forEach(function(item) {
    let idx;
    let found = merged.some(function(el, i) {
      let isFound = true;
      compareKeyList.forEach(ck => {
        isFound = isFound && (el[ck] === item[ck]); 
      });
      idx = isFound ? i : null;
      return isFound;
    });
    if (!found) {
      merged.push(item);
    } else if (idx !== null) {
      Object.keys(item).forEach(k => {
        if (item.hasOwnProperty(k)) {
          if (convertToArrayList.includes(k)) {
            if (!Array.isArray(merged[idx][k])) {
              let tmp = merged[idx][k];
              merged[idx][k] = [];
              merged[idx][k].push(tmp);
              merged[idx][k].push(item[k]);
            } else {
              merged[idx][k].push(item[k]);
            }
          } else {
            merged[idx][k] = item[k];
          }
        }
      });
    }
  });

  return merged;
}

module.exports = mergeObjectWithSameKeyInArray;
