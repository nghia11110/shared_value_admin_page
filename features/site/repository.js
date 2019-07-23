const knex = require('../../db');

async function getAllSites(condition) {
  const { page, perPage } = condition;
  const data = await knex('sites')
    .whereNull('deleted_at')
    .orderBy('updated_at', 'desc')
    .select('id','name', 'key_name', 'url')
    .paginate(perPage, page);
  return data;
}

async function createSite({ sitename, keyname , url}) {
  const [site] = await knex('sites')
    .insert({
      name: sitename,
      key_name: keyname,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(['id','name', 'key_name']);
  return site;
}

async function updateSite({ id, sitename: name, keyname: key_name, url }) {
  const [site] = await knex('sites')
    .where({ id })
    .update({
      name,
      key_name,
      url,
      updated_at: new Date(),
    })
    .returning(['id', 'name', 'key_name']);
  return site;
}

async function deleteSite({ id }) {
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
  getAllSites,
  createSite,
  updateSite,
  deleteSite
};
