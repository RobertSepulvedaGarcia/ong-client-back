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

const updateMember = async (req, res) => {
  console.log(req.params.id);

  const existsMember = await Members.findOne(req.params.id);

  if (!existsMember) {
    return res.json({
      ok: false,
      msg: 'Error, Member not exists',
    });
  }
  try {
    await Members.update(req.body, {
      where: { id: req.params.id },
    });

    return res.json({
      ok: true,
      msg: 'Members update',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      msg: 'Error, try again',
    });
  }
};
module.exports = { getAllMembemres, createMember, updateMember, deleteMember };
