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
      'crawl_hotels.updated_at',
      knex.raw("array_agg(json_build_object('data',crawl_conditions.*)) as crawl_conditions"))
    .groupBy('crawl_hotels.hotel_id',
      'crawl_hotels.site_id',
      'crawl_hotels.base_url',
      'hotels.name',
      'sites.name',
      'crawl_hotels.updated_at',)
    .whereNull('crawl_hotels.deleted_at')
    .whereNull('crawl_conditions.deleted_at')
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
    .update({
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

  // promise.push(knex('crawl_hotels')
  //   .where({ hotel_id, site_id })
  //   .update({
  //     base_url: url,
  //     updated_at: new Date(),
  //   })
  //   .returning(['id'])
  // );

  // for (el in listSettingAdultRoom) {
  //   listSettingAdultRoomArray.push(listSettingAdultRoom[el]);
  // }
  // for (i = 0; i < crawlTargetDays.length; i++) {
  //   promise.push(
  //     knex('crawl_conditions')
  //     .insert({
  //       hotel_id,
  //       site_id,
  //       crawl_target_days: parseInt(crawlTargetDays[i]),
  //       stay_adults: listSettingAdultRoomArray[i].stay_adults,
  //       stay_rooms: listSettingAdultRoomArray[i].stay_rooms,
  //       stay_days: listSettingAdultRoomArray[i].stay_days,
  //       stay_children: listSettingAdultRoomArray[i].stay_children,
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //     })
  //     .returning(['id'])
  //   );
  // }

  // return Promise.all(promise);
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
