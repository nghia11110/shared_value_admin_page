const repository = require('../repository');

async function createSite(req, res) {
  let site = {};
  const registerSuccessMessage = '追加しました！';
  try {
    site = await repository.createSite(req.body);
  } catch (error) {
    console.log(error);
    site = error;
  }
  if (site.id) {
    req.session.messages = { 'success': registerSuccessMessage };
    res.redirect('/sites');
    return;
  }
  const { code } = site;
  const databaseError =
    code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  req.session.messages.errors = { databaseError };
  res.redirect('/site/add');
}

module.exports = createSite;
