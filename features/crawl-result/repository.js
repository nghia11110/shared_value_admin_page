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
    .select(knex.raw('sum(price_total) as sales_value, sum(remain_rooms) as remain_rooms, count(*) as number_booking, DATE(checkin)'))
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

async function getAllCrawlResultsByCrawlDate(condition) {
  const { crawl_created_at,
    hotel_id,
    hotel_room_type_id,
    site_id,
    // start_date,
    // end_date
  } = condition;
  const data = await knex('scrape_results')
    .select([
      'checkin',
      'price_total',
      'remain_rooms',
    ])
    .where({
      hotel_id,
      site_id,
      hotel_room_type_id,
    })
    .whereRaw('??::date = ?', ['crawl_created_at', crawl_created_at])
    .limit(3)
    .orderBy('checkin', 'asc');
    // console.log(data);
  return data;
}

module.exports = {
  getAllCrawlResults,
  getAllCrawlResultsByCrawlDate
};
