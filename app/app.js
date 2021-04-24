/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const route = require('./routes/index.route');
const cookieSession = require('cookie-session');
const { FeedbackService, SpeakerService } = require('./services/index.service');
const feedbackService = new FeedbackService('../data/feedback.data.json');
const speakerService = new SpeakerService('../data/speakers.data.json');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('trust proxy', 1);
app.use(
  cookieSession({ name: 'session124', keys: ['q4tgfsg4pthk9344@$43', '2390r#!@$!$kdmbksmbs,f'] })
);

// TODO : implement template to render indiviual speaker
// TODO : implement template to render indiviual speaker  detail
// TODO : render all artwork for each indiviual speaker
// TODO : Create an error page and render it
// TODO : Create you custom error handler
// TODO : validate & sanitize  input from forms if error redirect to feedback page with error
// TODO : create a notification if feedback is saved
// TODO :  create a REST API to handle  data recieval using JSON
// TODO : load  pixgrid if only there are artwork

app.use(async (req, res, next) => {
  try {
    const speakers = await speakerService.getNames();
    res.locals['speakers'] = speakers;
    next();
  } catch (err) {
    next(err);
  }
});
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', route({ feedbackService, speakerService }));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
