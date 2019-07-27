const { maxAdult, maxRoom, crawlConditonMatrix, stateCrawlConditionMatrix } = require('../constants');

async function loadPageEditSite(req, res) {
  const data = req.query;
  data.crawl_conditions = JSON.parse(data.crawl_conditions);
  data.crawl_conditions.forEach(crawlCondition => {
    stateCrawlConditionMatrix[crawlCondition.data.stay_adults - 1][crawlCondition.data.stay_rooms - 1] = crawlCondition.data.crawl_target_days;
  });

  res.render('pages/crawl-setting/edit', { data, maxAdult, maxRoom, crawlConditonMatrix, stateCrawlConditionMatrix });
}

module.exports = loadPageEditSite;
