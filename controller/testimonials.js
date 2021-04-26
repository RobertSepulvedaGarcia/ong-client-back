const { Testimonials } = require('../models/index.js');

 function updateTestimonial(data, id){
  return Testimonials.update(data, {
    where: {
      id    }
  });
 
}
function findOneTestimonial( id){
   return Testimonials.findOne({ where: { id }});
}

function createTestimonials(data) {
  data.type = 'testimonials';
  return Testimonials.upsert(data);
}

function getTestimonials(){
  return Testimonials.findAll();
}

const deleteTestimonial = async (req, res) => {
  const existsTestimonial = await Testimonials.findByPk(req.params.id);

  if (!existsTestimonial) {
    return res.json({
      msg: 'invalid testimonial id',
    });
  }
  try {
    await Testimonials.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({
      ok: true,
      msg: 'Testimonial deleted successfully',
    });
  } catch (error) {
    return res.json({
      msg: 'Error try again',
    });
  }
};


module.exports = { updateTestimonial, findOneTestimonial, createTestimonials, getTestimonials, deleteTestimonial};




