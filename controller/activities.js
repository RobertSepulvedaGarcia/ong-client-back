const { Activities } = require('../models');

module.exports = {
  create: (name, content, image) => {
    return Activities.create({ name, content, image }).then((act) => {
      return act.dataValues;
    });
  },
};
