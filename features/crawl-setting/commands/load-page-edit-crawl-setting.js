const { maxAdult, maxRoom, crawlConditonMatrix } = require('../constants');

async function loadPageEditSite(req, res) {
  const data = req.query;
  data.crawl_conditions = JSON.parse(data.crawl_conditions);
  // console.log(data.crawl_conditions[0].data);
  res.render('pages/crawl-setting/edit', { 'data': req.query, maxAdult, maxRoom, crawlConditonMatrix });
}

module.exports = loadPageEditSite;
