const { Activities } = require('../models/');

module.exports = {
  getAll: () => {
    return Activities.findAll();
  },
  findOne: (id) => {
    return Activities.findByPk(id);
  },
  create: (name, content, image) => {
    return Activities.create({ name, content, image }).then((act) => {
      return act.dataValues;
    });
  },
  edit: (id, name, content, image) => {
    return Activities.update(
      { name, content, image, updatedAt: new Date() },
      { where: { id } }
    );
  },
  delete: async (id) => {
    try {
      Activities.destroy({ where: { id } });
      return res.json({
        ok: true,
        msg: 'Activity deleted',
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
