const { updateCrawlSetting: updateCrawlSettingRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function updateCrawlSetting(req, res) {
  let crawlSetting = {};
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    crawlSetting = await updateCrawlSettingRepo({ ...req.body });
  } catch (error) {
    console.log(error);
    crawlSetting = error;
  }

  if (crawlSetting.id) {
    req.session.messages = { success: profileSuccessMessage };
    res.redirect('/crawl-settings');
    return;
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;
  req.session.messages = { errors: { databaseError } };
  res.redirect('/crawl-setting/edit');
}

module.exports = updateCrawlSetting;
