const Knex = require('knex');
const KnexQueryBuilder = require('knex/lib/query/builder');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV]);

KnexQueryBuilder.prototype.paginate = function (per_page, current_page) {
  const page = Math.max(current_page || 1, 1)
  const offset = (page - 1) * per_page
  const clone = this.clone()

  return Promise.all([
      per_page > 0 ? this.offset(offset).limit(per_page) : this.offset(offset),
      knex.count('*').from(clone.as('t1')),
    ])
    .then(([rows, total]) => {
      const count = parseInt(total.length > 0 ? total[0].count : 0)
      return {
        total: parseInt(count),
        per_page: per_page,
        offset: offset,
        to: offset + rows.length,
        last_page: Math.ceil(count / per_page),
        current_page: page,
        from: offset,
        data: rows,
      }
    })
}

knex.queryBuilder = function () {
  return new KnexQueryBuilder(knex.client)
}

module.exports = knex;
