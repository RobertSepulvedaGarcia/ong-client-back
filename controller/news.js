const New = require('../models/news');

const deleteNew = async (req, res) => {
  const existsNew = await New.findByPk(req.params.id);

  if (!existsNew) {
    return res.json({
      msg: 'New not exists',
    });
  }
  try {
    await New.destroy({
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
  deleteNew,
};
