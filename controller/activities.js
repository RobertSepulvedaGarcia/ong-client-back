const { Activities } = require('../models/');

module.exports = {
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
};
