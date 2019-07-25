const repository = require('../repository');

async function createCrawlSetting(req, res) {
  let crawlSetting = {};
  const registerSuccessMessage = '追加しました！';
  try {
    crawlSetting = await repository.createCrawlSetting(req.body);
    if (crawlSetting[0][0].id) {
      req.session.messages = { 'success': registerSuccessMessage };
      res.redirect('/crawl-settings');
      return;
    }
  } catch (error) {
    console.log(error);
    crawlSetting = error;
    const { code } = crawlSetting;
    const databaseError =
      code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
    req.session.messages.errors = { databaseError };
    res.redirect('/crawl-setting/add');
  }
}

module.exports = createCrawlSetting;
