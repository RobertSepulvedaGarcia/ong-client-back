const { Entries } = require('../models/index.js');

function findEntryById(id) {
  return Entries.findByPk(id);
}

function createNewsEntry(data) {
  data.type = 'news';
  return Entries.upsert(data);
}

module.exports.findEntryById = findEntryById;
module.exports.createNewsEntry = createNewsEntry;
