exports.up = async function up(knex) {
  await knex.schema.createTable('reservations', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['reservation_pkey']);
    table.string('reservation_code', 255).notNullable();
    table.string('reservation_guest_first_name', 255).notNullable();
    table.string('reservation_guest_last_name', 255).notNullable();
    table
      .timestamp('reservation_start_date')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('reservation_end_date')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer('reservation_guest_phone_number').notNullable();
    table.integer('hotel_id');
    table.integer('site_id');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('deleted_at')
      .nullable();

    // table.unique('email');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('reservations');
};
