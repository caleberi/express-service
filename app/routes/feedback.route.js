/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
  router.post(
    '/api',
    check('email').normalizeEmail().isEmail().withMessage('must be at least 5 chars long'),
    check('name').isString().trim(),
    check('title').isString().trim(),
    !check('message').isEmpty(),
    function (req, res, next) {
      const errors = validationResult(req);
      const { name, email, title, message } = req;
      if (!errors.isEmpty()) {
        res.status(401).json({
          errors: errors.array(),
        });
        return;
      }
      res.json({
        errors: null,
        feedback: {
          name,
          email,
          title,
          message,
        },
      });
      return;
    }
  );
  return router;
};
