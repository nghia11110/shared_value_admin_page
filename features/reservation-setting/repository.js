const knex = require('../../db');

async function getAllReservationSettings(condition) {
  const { page, perPage, searchHotelName } = condition;
  const data = await knex('reservations')
    .join(knex('hotels')
      .modify(function(queryBuilder) {
        if (searchHotelName) {
          queryBuilder.where('name', 'like', '%' + searchHotelName + '%');
        }
      })
      .as('h'), function() {
        this.on('reservations.hotel_id', '=', 'h.id')
    })
    .join('sites', 'reservations.site_id', '=', 'sites.id')
    .select('reservations.id',
      'reservations.hotel_id',
      'reservations.site_id',
      'reservations.reservation_code',
      'reservations.reservation_guest_first_name',
      'reservations.reservation_guest_last_name',
      'reservations.reservation_start_date',
      'reservations.reservation_end_date',
      'reservations.reservation_guest_phone_number',
      'h.name as hotel_name',
      'sites.name as site_name',
    )
    .whereNull('reservations.deleted_at')
    .orderBy('reservations.reservation_start_date', 'desc')
    .paginate(perPage, page);
  return data;
}

async function createReservationSetting(object) {
  const {
    hotel_id,
    site_id,
    reservation_code,
    reservation_guest_first_name,
    reservation_guest_last_name,
    reservation_start_date,
    reservation_end_date,
    reservation_guest_phone_number
  } = object;

  const [reservation] = await knex('reservations')
    .insert({
      hotel_id,
      site_id,
      reservation_code,
      reservation_guest_first_name,
      reservation_guest_last_name,
      reservation_start_date,
      reservation_end_date,
      reservation_guest_phone_number,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(['id']);
  return reservation;
}

async function updateReservationSetting(object) {
  const {
    id,
    hotel_id,
    site_id,
    reservation_code,
    reservation_guest_first_name,
    reservation_guest_last_name,
    reservation_start_date,
    reservation_end_date,
    reservation_guest_phone_number
  } = object;

  const [reservation] = await knex('reservations')
    .where({ id })
    .update({
      hotel_id,
      site_id,
      reservation_code,
      reservation_guest_first_name,
      reservation_guest_last_name,
      reservation_start_date,
      reservation_end_date,
      reservation_guest_phone_number,
      updated_at: new Date(),
    })
    .returning(['id']);
  return reservation;
}

async function deleteReservationSetting({ id }) {
  const [reservation] = await knex('reservations')
    .where({ id })
    // .del()
    .update({
      deleted_at: new Date(),
    })
    .returning(['id']);
  return reservation;
}

async function searchReservation(object) {
  if (!Object.keys(object).length) {
    return {};
  }
  const {
    reservation_guest_first_name,
    reservation_guest_last_name,
    reservation_start_date,
    reservation_end_date,
    reservation_guest_phone_number
  } = object;

  const [reservation] = await knex('reservations')
    .where({
      reservation_guest_first_name,
      reservation_guest_last_name,
      reservation_start_date,
      reservation_end_date,
    })
    .where(
      knex.raw(`RIGHT(reservation_guest_phone_number, 4) = '${reservation_guest_phone_number}'`)
    )
    .returning(['id', 'reservation_code']);
  return reservation;
}

module.exports = {
  getAllReservationSettings,
  createReservationSetting,
  updateReservationSetting,
  deleteReservationSetting,
  searchReservation,
};
