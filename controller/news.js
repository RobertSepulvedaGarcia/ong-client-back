const sequelize = require('sequelize');
const news = require('../models').News;

// Function to find the entries where type is news
module.exports = {
  find: function (type) {
    return news
      .findAll({
        where: { type: 'news' },
        attributes: ['id', 'name', 'image', 'createdAt'],
      })
      .then((news) => {
        return news;
      });
  },

  findNewById: function (id) {
    return news.findByPk(id).then((entry) => entry);
  },

  updateNewById: function (id, data) {
    return news.update(data, { where: { id } });
  },

  createNewsEntry: function (data) {
    data.type = 'news';
    return news.upsert(data).then((entry) => entry);
  },
  deleteNew: async function (req, res) {
    const requestedID = req.params.id;
    let requestedEntry = await news.findByPk(requestedID);

    if (requestedEntry !== null) {
      news.destroy({
        where: {
          id: requestedID,
        },
      });
      return res.status(200).json({ ok: true, msg: 'New deleted' });
    }
    return res.status(404).json({ ok: false, error: 'This ID does not exist' });
  },
};
