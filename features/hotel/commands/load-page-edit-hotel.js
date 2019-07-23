async function loadPageEditHotel(req, res) {
  res.render('pages/hotel/edit', { 'data': req.query });
}

module.exports = loadPageEditHotel;
