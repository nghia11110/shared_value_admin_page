const { updateCrawlSetting: updateCrawlSettingRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateCrawlSetting(req, res) {
  let crawlSetting = {};
  try {
    crawlSetting = await updateCrawlSettingRepo(req.body);
    // console.log(crawlSetting);
    req.session.messages = { 'success': UPDATE_INFO_SUCCESS_MESSAGE };
    res.redirect('/crawl-settings');
    return;
  } catch (error) {
    console.log(error);
    crawlSetting = error;
    const { code } = crawlSetting;
    const databaseError = UPDATE_INFO_ERROR_MESSAGE;
    req.session.messages = { errors: { databaseError } };
    res.redirect('/crawl-settings');
  }
}

module.exports = updateCrawlSetting;
