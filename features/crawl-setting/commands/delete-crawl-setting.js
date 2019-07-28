const { deleteCrawlSetting: deleteCrawlSettingRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function deleteCrawlSetting(req, res) {
  let crawlSetting = {};
  const { hotel_id, site_id } = req.body;
  try {
    crawlSetting = await deleteCrawlSettingRepo({ hotel_id, site_id });

    req.session.messages = { success: UPDATE_INFO_SUCCESS_MESSAGE };
    res.redirect('/crawl-settings');
    return;
  } catch (error) {
    console.log(error);
    crawlSetting = error;
    const databaseError = UPDATE_INFO_ERROR_MESSAGE;
    req.session.messages = { errors: { databaseError } };
    res.redirect('/crawl-settings');
  }
}

module.exports = deleteCrawlSetting;
