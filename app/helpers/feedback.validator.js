const { check } = require('express-validator');

// eslint-disable-next-line no-unused-vars
async function formChecker(req, res, next) {
  await check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address . Guy ð you are funny ð!')
    .run(req);
  await check('name').not().isEmpty().trim().withMessage('is your name emptyð¤£?').run(req);
  await check('title')
    .not()
    .isEmpty()
    .trim()
    .withMessage('you are making me laugh ðððð¤£ð¤£')
    .run(req);
  await check('message').not().isEmpty().trim().withMessage('please include message').run(req);
  return req;
}

exports.validate = function (method) {
  switch (method) {
    case 'feedback':
      // eslint-disable-next-line no-unused-vars
      return formChecker;
  }
};
