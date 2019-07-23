const { deleteSite: deleteSiteRepo } = require('../repository');
const { UPDATE_INFO_SUCCESS_MESSAGE, UPDATE_INFO_ERROR_MESSAGE } = require('../constants');

async function deleteSite(req, res) {
  let site = {};
  const { id } = req.body;
  const profileSuccessMessage = UPDATE_INFO_SUCCESS_MESSAGE;
  try {
    site = await deleteSiteRepo({ id });
  } catch (error) {
    console.log(error);
    site = error;
  }

  if (site.id) {
    req.session.messages = { success: profileSuccessMessage };
    res.redirect('/sites');
    return;
  }

  const databaseError = UPDATE_INFO_ERROR_MESSAGE;
  req.session.messages = { errors: { databaseError } };
  res.redirect('/site/delete');
}

module.exports = deleteSite;
