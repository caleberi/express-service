const express = require('express');
const router = express.Router();

const feedbackRoute = require('./feedback.route');
const speakerRoute = require('./speakers.route');

module.exports = ({ feedbackService, speakerService }) => {
  // eslint-disable-next-line no-unused-vars
  router.get('/', async (req, res, next) => {
    res.render('layout', {
      title: 'Corps',
      pageName: 'ForteNight',
      template: 'index',
      assets: res.locals.speakers,
      assetInfo: await speakerService.getListShort(),
      assetImages: await speakerService.getAllArtwork(),
    });
  });

  router.use('/speakers', speakerRoute(speakerService));
  router.use('/feedback', feedbackRoute(feedbackService));

  return router;
};
