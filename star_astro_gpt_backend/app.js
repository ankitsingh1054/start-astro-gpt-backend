const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');

dotenv.config();

const connect = require('./database/mongo.database');
const authRoute = require('./routes/auth.route');
const topicRoute = require('./routes/topic.route');
const chatRoute = require('./routes/chat.route');
// eslint-disable-next-line no-unused-vars
const oauthGoogle = require('./oauth/google_oauth');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}));
app.get(
  '/auth/google/redirect',
  passport.authenticate('google', {session: false, failureRedirect: process.env.OAUTH_FAILED_URL}),
  (req, res) => {
    res.redirect(req.user); // req.user has the redirection_url
  }
);

app.use('/auth', authRoute);
app.use('/topic', topicRoute);
app.use('/chat', chatRoute);
app.get('/success', (req, res) => {
  res.status(200).send();
});

app.use((req, res) => res.status(404).send({message: 'endpoint not found!'}));
// app.use(error_handler)

app.listen(PORT, async () => {
  await connect();
  console.log(`🚀 Server started of port ${PORT}!`);
});
