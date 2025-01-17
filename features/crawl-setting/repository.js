const knex = require('../../db');

async function getAllCrawlSettings(condition) {
  const { page, perPage, searchHotelName } = condition;
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
    .orderBy('crawl_hotels.updated_at', 'desc')
    .paginate(perPage, page);
  return data;
}

async function createCrawlSetting(object) {
  const promise = [];
  const listSettingAdultRoomArray = [];
  const {
    hotel_id,
    site_id,
    url,
    'crawl-condition-checkbox[]': crawlConditionCheckbox,
  } = object;
  const listSettingAdultRoom = JSON.parse(object['list-setting-adult-room']);
  let crawlTargetDays = [];
  if (!Array.isArray(object['crawl-condition-crawl-target-days[]'])) {
    crawlTargetDays.push(object['crawl-condition-crawl-target-days[]']);
  } else {
    crawlTargetDays = object['crawl-condition-crawl-target-days[]'];
  }

 const [updateCrawlHotel] = await knex('crawl_hotels')
    .where({ hotel_id, site_id })
    .whereNull('deleted_at')
    .update({
      base_url: url,
      updated_at: new Date(),
    })
    .returning(['id']);

  if (!updateCrawlHotel) {
    const insertCrawlHotel = knex('crawl_hotels')
      .insert({
        hotel_id,
        site_id,
        base_url: url,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning(['id']);
    promise.push(insertCrawlHotel);
  }

  for (el in listSettingAdultRoom) {
    listSettingAdultRoomArray.push(listSettingAdultRoom[el]);
  }
  for (i = 0; i < crawlTargetDays.length; i++) {
    promise.push(
      knex('crawl_conditions')
      .insert({
        hotel_id,
        site_id,
        crawl_target_days: parseInt(crawlTargetDays[i]),
        stay_adults: listSettingAdultRoomArray[i].stay_adults,
        stay_rooms: listSettingAdultRoomArray[i].stay_rooms,
        stay_days: listSettingAdultRoomArray[i].stay_days,
        stay_children: listSettingAdultRoomArray[i].stay_children,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning(['id'])
    );
  }

  return Promise.all(promise);
}

async function updateCrawlSetting(object) {
  const promise = [];
  const listSettingAdultRoomArray = [];
  const {
    hotel_id,
    site_id,
    url,
    'crawl-condition-checkbox[]': crawlConditionCheckbox,
  } = object;
  const listSettingAdultRoom = JSON.parse(object['list-setting-adult-room']);
  let crawlTargetDays = [];
  if (!Array.isArray(object['crawl-condition-crawl-target-days[]'])) {
    crawlTargetDays.push(object['crawl-condition-crawl-target-days[]']);
  } else {
    crawlTargetDays = object['crawl-condition-crawl-target-days[]'];
  }

  for (el in listSettingAdultRoom) {
    listSettingAdultRoomArray.push(listSettingAdultRoom[el]);
  }

  return knex.transaction(function(trx) {
    knex('crawl_conditions')
      .transacting(trx)
      .where({ hotel_id, site_id })
      // .del()
      .update({
        deleted_at: new Date(),
      })
      .then(function() {
        return knex('crawl_hotels')
          .transacting(trx)
          .where({ hotel_id, site_id })
          .update({
            base_url: url,
            updated_at: new Date(),
          })
          .then(function() {
            if (listSettingAdultRoomArray.length) {
              for (i = 0; i < crawlTargetDays.length; i++) {
                promise.push(
                  knex('crawl_conditions')
                  .insert({
                    hotel_id,
                    site_id,
                    crawl_target_days: parseInt(crawlTargetDays[i]),
                    stay_adults: listSettingAdultRoomArray[i].stay_adults,
                    stay_rooms: listSettingAdultRoomArray[i].stay_rooms,
                    stay_days: listSettingAdultRoomArray[i].stay_days,
                    stay_children: listSettingAdultRoomArray[i].stay_children,
                    created_at: new Date(),
                    updated_at: new Date(),
                  })
                  .returning(['id'])
                );
              }
              return Promise.all(promise);
            }
            return true;
          })
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then(function(res) {
    console.log('Transaction complete.');
    return res;
  })
  .catch(function(err) {
    console.error(err);
  });
}

async function deleteCrawlSetting({ hotel_id, site_id }) {
  return knex.transaction(function(trx) {
    knex('crawl_conditions')
      .transacting(trx)
      .where({ hotel_id, site_id })
      .whereNull('deleted_at')
      .update({
        deleted_at: new Date(),
      })
      .then(function() {
        return knex('crawl_hotels')
          .transacting(trx)
          .where({ hotel_id, site_id })
          .whereNull('deleted_at')
          .update({
            deleted_at: new Date(),
          })
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .then(function(res) {
    console.log('Transaction complete.');
    return res;
  })
  .catch(function(err) {
    console.error(err);
  });
}

module.exports = {
  getAllCrawlSettings,
  createCrawlSetting,
  updateCrawlSetting,
  deleteCrawlSetting
};
