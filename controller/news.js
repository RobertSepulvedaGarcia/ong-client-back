const { Entries } = require('../models/index.js');

const deleteNew = async (req, res) => {
  const existsNew = await Entries.findByPk(req.params.id);

  if (!existsNew) {
    return res.json({
      msg: 'New not exists',
    });
  }
  try {
    await Entries.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      ok: true,
      msg: 'New delete',
    });
  } catch (error) {
    return res.json({
      msg: 'Error try again',
    });
  }
};

module.exports = {
  deleteNew
};
