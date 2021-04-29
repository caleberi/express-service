const { check } = require('express-validator');

// eslint-disable-next-line no-unused-vars
async function formChecker(req, res, next) {
  await check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('must be at least 5 chars long')
    .run(req);
  await check('name').not().isEmpty().trim().run(req);
  await check('title').not().isEmpty().trim().run(req);
  await check('message').not().isEmpty().trim().run(req);
  return req;
}

exports.validate = function (method) {
  switch (method) {
    case 'feedback':
      // eslint-disable-next-line no-unused-vars
      return formChecker;
  }
};
