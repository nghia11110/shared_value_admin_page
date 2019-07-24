async function loadPageEditSite(req, res) {
  res.render('pages/site/delete', { 'data': req.query });
}

module.exports = loadPageEditSite;
