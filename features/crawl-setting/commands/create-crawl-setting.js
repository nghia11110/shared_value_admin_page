const repository = require('../repository');

async function createCrawlSetting(req, res) {
  let crawlSetting = {};
  const registerSuccessMessage = '追加しました！';
  try {
    crawlSetting = await repository.createCrawlSetting(req.body);
  } catch (error) {
    console.log(error);
    crawlSetting = error;
  }
  // if (crawlSetting.id) {
  //   req.session.messages = { 'success': registerSuccessMessage };
  //   res.redirect('/crawl-settings');
  //   return;
  // }
  // const { code } = crawlSetting;
  // const databaseError =
  //   code === '23505' ? 'The email has already been taken.' : 'Something went wrong.';
  // req.session.messages.errors = { databaseError };
  // res.redirect('/crawl-setting/add');
}

module.exports = createCrawlSetting;
