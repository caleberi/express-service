const express = require('express');
const router = express.Router();

module.exports = (speakerService) => {
  // eslint-disable-next-line no-unused-vars
  router.get('/', async function (req, res, next) {
    res.render('layout', {
      title: 'Corps',
      pageName: 'ForteNight',
      template: 'speakers',
      assets: res.locals.speakers,
      speakers: await speakerService.getList(),
      assetImages: await speakerService.getAllArtwork(),
    });
    return;
  });
  // eslint-disable-next-line no-unused-vars
  router.get('/:shortname', function (req, res, next) {
    res.send(`Detail page of ${req.params.shortname}`);
    return;
  });
  return router;
};
