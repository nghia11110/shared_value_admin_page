const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');
const mountHotelRoutes = require('../features/hotel/routes');
const mountSiteRoutes = require('../features/site/routes');
const mountCrawlSettingRoutes = require('../features/crawl-setting/routes');
const mountCrawlResultRoutes = require('../features/crawl-result/routes');
const mountReservationSettingRoutes = require('../features/reservation-setting/routes');

function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {
  res.render('pages/dashboard');
});

router.get('/icons', isAuthenticated, (req, res) => {
  res.render('pages/icons');
});

router.get('/maps', isAuthenticated, (req, res) => {
  res.render('pages/maps');
});

router.get('/tables', isAuthenticated, (req, res) => {
  res.render('pages/tables');
});

mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);
mountHotelRoutes(router, [isAuthenticated]);
mountSiteRoutes(router, [isAuthenticated]);
mountCrawlSettingRoutes(router, [isAuthenticated]);
mountCrawlResultRoutes(router, [isAuthenticated]);
mountReservationSettingRoutes(router, [isAuthenticated]);

module.exports = router;
