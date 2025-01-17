const { getAllSites } = require('../repository');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');

async function loadPageSites(req, res) {
  const perPage = 10;
  const page = req.params.page || 1;
  const condition = { page, perPage};
  let data = {};
  try {
    data = await getAllSites(condition);
  } catch (error) {
    console.log(error);
    req.session.messages = { databaseError: FETCH_INFO_ERROR_MESSAGE };
  }
  res.render('pages/sites', { 'sites': data.data, 'current': data.current_page, 'pages': Math.ceil(data.total / data.per_page), 'per_page': data.per_page });
}

module.exports = loadPageSites;
