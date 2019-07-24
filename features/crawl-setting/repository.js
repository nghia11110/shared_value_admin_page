const knex = require('../../db');

async function getAllCrawlSettings(condition) {
  const { page, perPage } = condition;
  const data = await knex('crawl_hotels')
    .leftJoin('crawl_conditions', function() {
      this.on('crawl_hotels.hotel_id', '=', 'crawl_conditions.hotel_id')
        .andOn ('crawl_hotels.site_id', '=', 'crawl_conditions.site_id')
    })
    .join('hotels', 'crawl_hotels.hotel_id', '=', 'hotels.id')
    .join('sites', 'crawl_hotels.site_id', '=', 'sites.id')
    .select('crawl_hotels.hotel_id',
      'crawl_hotels.site_id',
      'crawl_hotels.base_url',
      'hotels.name as hotel_name',
      'sites.name as site_name',
      knex.raw("array_agg(json_build_object('data',crawl_conditions.*)) as crawl_conditions"))
    .groupBy('crawl_hotels.hotel_id',
      'crawl_hotels.site_id',
      'crawl_hotels.base_url',
      'hotels.name',
      'sites.name')
    .whereNull('crawl_hotels.deleted_at')
    .whereNull('crawl_conditions.deleted_at')
    .paginate(perPage, page);
  return data;
}

async function createCrawlSetting({ sitename, keyname , url}) {
  const [site] = await knex('sites')
    .insert({
      name: sitename,
      key_name: keyname,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(['id','name', 'key_name']);
  return site;
}

async function updateCrawlSetting({ id, sitename: name, keyname: key_name, url }) {
  const [site] = await knex('sites')
    .where({ id })
    .update({
      name,
      key_name,
      url,
      updated_at: new Date(),
    })
    .returning(['id', 'name', 'key_name']);
  return site;
}

async function deleteCrawlSetting({ id }) {
  const [site] = await knex('sites')
    .where({ id })
    // .del()
    .update({
      deleted_at: new Date(),
    })
    .returning(['id']);
  return site;
}

module.exports = {
  getAllCrawlSettings,
  createCrawlSetting,
  updateCrawlSetting,
  deleteCrawlSetting
};
