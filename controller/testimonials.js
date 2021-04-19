const { Testimonials } = require('../models/index.js');


function createTestimonials(data) {
  data.type = 'testimonials';
  return Testimonials.upsert(data);
}

module.exports.createTestimonials = createTestimonials;
