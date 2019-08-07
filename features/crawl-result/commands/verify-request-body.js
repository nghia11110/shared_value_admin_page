const constants = require('../constants');

const { NO_INPUT_CRAWL_TARGET_DAYS_ERROR } = constants;

async function validateRegisterCrawlSettingPayload(req, res, next) {
  let errors;
  if (!req.body['crawl-condition-crawl-target-days[]']) {
    errors = NO_INPUT_CRAWL_TARGET_DAYS_ERROR;
  }

  if (errors) {
    req.session.messages.errors = { crawl_condition: errors };
    return res.status(400).redirect('/crawl-setting/add');
  }
  return next();
}

module.exports = validateRegisterCrawlSettingPayload;
