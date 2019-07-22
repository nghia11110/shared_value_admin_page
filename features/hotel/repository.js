const knex = require('../../db');

async function getAllHotels(condition) {
  let { page, perPage } = condition;
  const hotels = await knex('hotels')
    .whereNull('deleted_at')
    .offset(page*perPage - perPage)
    .limit(perPage)
    .orderBy('id', 'esc')
    .select('id','name', 'key_name');
  return hotels;
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

module.exports = {
  getAllHotels,
  updateHotelInfo,
};
