const { wrap } = require('async-middleware');

const validateRegisterCrawlSettingPayload = require('./commands/verify-request-body');
const updateCrawlSetting = require('./commands/update-crawl-setting');
const createCrawlSetting = require('./commands/create-crawl-setting');
// const deleteCrawlSetting = require('./commands/delete-crawl-setting');

const loadPage = require('./commands/load-page');
const loadPageAddCrawlSetting = require('./commands/load-page-add-crawl-setting');
const loadPageEditCrawlSetting = require('./commands/load-page-edit-crawl-setting');
// const loadPageDeleteCrawlSetting = require('./commands/load-page-delete-crawl-setting');

module.exports = (router, middlewares = []) => {
  router.get('/crawl-settings/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/crawl-setting/add', wrap(loadPageAddCrawlSetting));
  router.get('/crawl-setting/edit', wrap(loadPageEditCrawlSetting));
  // router.get('/crawl-setting/delete', wrap(loadPageDeleteCrawlSetting));

  router.post('/crawl-setting/edit', wrap(validateRegisterCrawlSettingPayload)/*, wrap(updateCrawlSetting)*/);
  router.post('/crawl-setting/add', wrap(validateRegisterCrawlSettingPayload), wrap(createCrawlSetting));
  // router.post('/crawl-setting/delete', /*wrap(requestBodyValidation), */wrap(deleteCrawlSetting));

  return router;
};
