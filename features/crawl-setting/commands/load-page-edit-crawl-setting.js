async function loadPageEditSite(req, res) {
  res.render('pages/site/edit', { 'data': req.query });
}

module.exports = loadPageEditSite;
