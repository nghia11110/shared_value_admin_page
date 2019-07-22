const knex = require('../../db');

async function getAllHotels(condition) {
  const { page, perPage } = condition;
  const data = await knex('hotels')
    .whereNull('deleted_at')
    .orderBy('id', 'esc')
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

module.exports = {
  getAllHotels,
  updateHotelInfo,
};
