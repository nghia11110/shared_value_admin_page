const knex = require('../../db');

async function getAllHotels(condition) {
  const { page, perPage } = condition;
  const data = await knex('hotels')
    .whereNull('deleted_at')
    .orderBy('updated_at', 'desc')
    .select('id','name', 'key_name')
    .paginate(perPage, page);
  return data;
}

async function getAllHotelWithHotelRoomTypes(condition) {
  const { page, perPage } = condition;
  const data = await knex('hotels')
    .join(knex('hotel_room_types')
      .whereNull('hotel_room_types.deleted_at')
      .as('hrt'), function() {
        this.on('hotels.id', '=', 'hrt.hotel_id')
    })
    .select('hotels.id',
      'hotels.name',
      'hotels.key_name',
      'hotels.updated_at',
      knex.raw("array_agg(json_build_object('data',hrt.*)) as hotel_room_types"))
    .groupBy('hotels.id',
      'hotels.name',
      'hotels.key_name',
      'hotels.updated_at',)
    .whereNull('hotels.deleted_at')
    .orderBy('hotels.updated_at', 'desc')
    .paginate(perPage, page);
  return data;
}

async function createHotel({ hotelname, keyname }) {
  const [hotel] = await knex('hotels')
    .insert({
      name: hotelname,
      key_name: keyname,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(['id','name', 'key_name']);
  return hotel;
}

async function updateHotel({ id, hotelname: name, keyname: key_name }) {
  const [hotel] = await knex('hotels')
    .where({ id })
    .update({
      name,
      key_name,
      updated_at: new Date(),
    })
    .returning(['id', 'name', 'key_name']);
  return hotel;
}

async function deleteHotel({ id }) {
  const [hotel] = await knex('hotels')
    .where({ id })
    // .del()
    .update({
      deleted_at: new Date(),
    })
    .returning(['id']);
  return hotel;
}

module.exports = {
  getAllHotels,
  getAllHotelWithHotelRoomTypes,
  createHotel,
  updateHotel,
  deleteHotel
};
