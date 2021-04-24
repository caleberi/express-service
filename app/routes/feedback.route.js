const express = require('express');
const router = express.Router();

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
  router.post('/', function (req, res, next) {
    res.send(`FeedBack Posted`);
    return;
  });
  return router;
};
