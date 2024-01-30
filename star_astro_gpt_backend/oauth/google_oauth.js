/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/users');

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.GOOGLE_AUTH_REDIRECTURL, // same URI as registered in Google console portal
      clientID: process.env.GOOGLE_CLIENT_ID, // replace with copied value from Google console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userEmail = profile.emails && profile.emails[0].value; // profile object has the user info
        const user = await User.findOne({email: userEmail}).select({_id: 1}); // check whether user exist in database
        if (user) {
          const token = jwt.sign(JSON.stringify({id: user._id}), process.env.JWT_SECRET); // generating token
          return done(null, `${process.env.GOOGLE_AUTH_SUCCESS}?token=${token}`); // redirect_url will get appended to req.user object : passport.js in action
        }
        const userSave = await User({
          name: profile._json.name,
          email: profile._json.email,
          profilePic: profile._json.picture,
          from: 'google'
        });
        await userSave.save();
        const token = jwt.sign(JSON.stringify({id: userSave._id}), process.env.JWT_SECRET); // generating token
        return done(null, `${process.env.GOOGLE_AUTH_SUCCESS}?token=${token}`);
      } catch (error) {
        done(error);
      }
      return true;
    }
  )
);
