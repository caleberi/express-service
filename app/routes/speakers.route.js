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
  router.get('/:shortname', async function (req, res, next) {
    const { shortname } = req.params;
    if (typeof shortname !== 'string') {
      next(new Error('name params must be string😜'));
    }
    const speaker = await speakerService.getSpeaker(shortname);
    const artworks = await speakerService.getArtworkForSpeaker(shortname);

    res.render('layout', {
      title: 'Corps',
      pageName: 'ForteNight',
      template: 'speaker',
      assets: res.locals.speakers,
      data: {
        ...speaker,
        artworks: artworks ? artworks : [],
      },
    });
    return;
  });
  return router;
};
