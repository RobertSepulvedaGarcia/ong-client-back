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

module.exports = { updateTestimonial, findOneTestimonial, createTestimonials};




