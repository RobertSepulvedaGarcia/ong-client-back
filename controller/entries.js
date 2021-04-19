const sequelize = require('sequelize');
const entries = require('../models').Entries;

// Function to find the entries where type is news
module.exports = {
  find: function (type) {
    return entries
      .findAll({
        where: { type: 'news' },
        attributes: ['id', 'name', 'image', 'createdAt'],
      })
      .then((entries) => {
        return entries;
      });
  },

  findEntryById: function (id) {
    return entries.findByPk(id).then((entry) => entry);
  },

  updateEntryById: function (id, data) {
    return entries.update(data, { where: { id } });
  },

  createNewsEntry: function (data) {
    data.type = 'news';
    return entries.upsert(data).then((entry) => entry);
  },
};
