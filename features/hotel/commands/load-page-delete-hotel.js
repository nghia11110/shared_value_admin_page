async function loadPageEditHotel(req, res) {
  res.render('pages/hotel/delete', { 'data': req.query });
}

module.exports = loadPageEditHotel;
