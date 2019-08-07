const knex = require('../../db');

async function getAllCrawlResults(condition) {
  const { searchHotelName } = condition;
  const data = await knex('crawl_hotels')
    .leftJoin(knex('crawl_conditions')
      .whereNull('crawl_conditions.deleted_at')
      .as('cc'), function() {
      this.on('crawl_hotels.hotel_id', '=', 'cc.hotel_id')
        .andOn ('crawl_hotels.site_id', '=', 'cc.site_id')
    })
    .join(knex('hotels')
      .modify(function(queryBuilder) {
        if (searchHotelName) {
          queryBuilder.where('name', 'like', '%' + searchHotelName + '%');
        }
      })
      .as('h'), function() {
        this.on('crawl_hotels.hotel_id', '=', 'h.id')
    })
    .join('sites', 'crawl_hotels.site_id', '=', 'sites.id')
    .select('crawl_hotels.hotel_id',
      'crawl_hotels.site_id',
      'crawl_hotels.base_url',
      'h.name as hotel_name',
      'sites.name as site_name',
      'crawl_hotels.updated_at',
      knex.raw("array_agg(json_build_object('data',cc.*)) as crawl_conditions"))
    .groupBy('crawl_hotels.hotel_id',
      'crawl_hotels.site_id',
      'crawl_hotels.base_url',
      'h.name',
      'sites.name',
      'crawl_hotels.updated_at',)
    .whereNull('crawl_hotels.deleted_at')
    .orderBy('crawl_hotels.updated_at', 'desc');
  return data;
}

module.exports = {
  getAllCrawlResults
};
