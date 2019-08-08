const knex = require('../../db');

async function getAllCrawlResults(condition) {
  const { crawl_created_at,
    hotel_id,
    hotel_room_type_id,
    site_id,
    start_date,
    end_date
  } = condition;
  const data = await knex('scrape_results')
    .select(knex.raw('sum(price_total) as sales_value, DATE(checkin)'))
    .where({
      hotel_id,
      site_id,
      hotel_room_type_id,
    })
    .whereRaw('??::date = ?', ['crawl_created_at', crawl_created_at])
    .andWhere('checkin', '>=', start_date)
    .andWhere('checkin', '<=', end_date)
    .groupBy('checkin')
    .orderBy('date');
    // console.log(data);
  return data;
}

module.exports = {
  getAllCrawlResults
};
