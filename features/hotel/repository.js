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

async function updateHotelInfo({ name, username: email, id }) {
  const [user] = await knex('users')
    .where({ id })
    .update({
      name,
      email,
      updated_at: new Date(),
    })
    .returning(['email', 'name']);
  return user;
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

module.exports = {
  getAllHotels,
  updateHotelInfo,
  createHotel
};
