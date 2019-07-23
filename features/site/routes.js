const { wrap } = require('async-middleware');

// const requestBodyValidation = require('./commands/verify-request-body');
const updateSite = require('./commands/update-site');
const createSite = require('./commands/create-site');
const deleteSite = require('./commands/delete-site');

const loadPage = require('./commands/load-page');
const loadPageAddSite = require('./commands/load-page-add-site');
const loadPageEditSite = require('./commands/load-page-edit-site');
const loadPageDeleteSite = require('./commands/load-page-delete-site');

module.exports = (router, middlewares = []) => {
  router.get('/sites/:page*?', middlewares.map(middleware => wrap(middleware)), wrap(loadPage));
  router.get('/site/add', wrap(loadPageAddSite));
  router.get('/site/edit', wrap(loadPageEditSite));
  router.get('/site/delete', wrap(loadPageDeleteSite));

  router.post('/site/edit', /*wrap(requestBodyValidation), */wrap(updateSite));
  router.post('/site/add', /*wrap(requestBodyValidation), */wrap(createSite));
  router.post('/site/delete', /*wrap(requestBodyValidation), */wrap(deleteSite));

  return router;
};
