const { Members } = require('../models');

const getAllMembemres = () => {
  return Members.findAll();
};

const createMember = (member) => {
  return Members.create(member);
};
const deleteMember = async (req, res) => {
  const existsMember = await Menbers.findOne(req.params.id);

  if (!existsMember) {
    return res.json({
      msg: 'Member not exists',
    });
  }

  try {
    await Members.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      ok: true,

      msg: 'Menber delete',
    });
  } catch (error) {
    console.log(error);

    return res.json({
      ok: false,

      msg: 'Error, try again',
    });
  }
};

module.exports = { getAllMembemres, createMember, deleteMember };
