/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const helpers = require('../helpers/feedback.validator');

module.exports = (feedbackService) => {
  // eslint-disable-next-line no-unused-vars
  router.get('/', async function (req, res, next) {
    res.render('layout', {
      template: 'feedback',
      title: 'Corps',
      pageName: 'ForteNight',
      assets: res.locals.speakers,
      feedbacks: await feedbackService.getList(),
    });
    return;
  });
  // eslint-disable-next-line no-unused-vars
  router.post('/api', async function (req, res, next) {
    req = await helpers.validate('feedback')(req, res, next);
    const errors = validationResult(req);
    const { name, email, title, message } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    } else {
      res.status(200).json({
        errors: null,
        feedback: { name, email, title, message },
      });
      return;
    }
  });
  return router;
};
