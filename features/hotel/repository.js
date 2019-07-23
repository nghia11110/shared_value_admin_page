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
    .del()
    .returning(['id']);
  return hotel;
}

module.exports = {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel
};
