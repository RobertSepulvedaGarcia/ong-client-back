const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const {
  updateTestimonial,
  findOneTestimonial,
  createTestimonials,
  getTestimonials,
  deleteTestimonial
} = require('../controller/testimonials');

//GET request to find and show all testimonials  
router.get('/', async (req, res, next) => {
  const testimonialList = await getTestimonials();
  return res.status(200).json(testimonialList);
});

//PUT request to update the testimony
router.put(
  '/:id',
  body('name').isString().notEmpty().trim().escape(),
  body('content').isString().notEmpty().trim().escape(),
  body('image').isString().notEmpty(),

  async function (req, res) {
    const errors = validationResult(req);
    const data = req.body;
    const id = req.params.id;
    if (!errors.isEmpty()) {
      return res.status(400).json({ STATUS: 'ERROR', errors: errors.array() });
    }

    try {
      if (await findOneTestimonial(id)) {
        await updateTestimonial(data, id);
        let response = await findOneTestimonial(id);

        return res
          .status(200)
          .json({
            Success: true,
            msg: 'Update successfully.',
            data: response.dataValues,
          });
      }

      return res
        .status(400)
        .json({ Success: false, error: "Testimonial doesn't exist." });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Post request for the creation of testimonials in data base 
router.post(
  '/',
  body('name').isString().notEmpty().trim().escape(),
  body('content').isString().notEmpty().trim().escape(),
  body('image').isString().notEmpty(),

  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors: errors.array() });
    }

  //DELETE request to delete a testimonial 
  router.delete('/:id', deleteTestimonial);

  module.exports = router;
    const data = req.body;
    await createTestimonials(data);

    return res.status(201).json({ ok: true, msg: 'Created successfully' });
  }
);

module.exports = router;
