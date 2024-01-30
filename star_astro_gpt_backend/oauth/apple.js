const AppleStrategy = require('passport-apple');
const passport = require('passport');

passport.use(
  new AppleStrategy(
    {
      clientID: '',
      teamID: '',
      callbackURL: '',
      keyID: '',
      privateKeyLocation: '',
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, idToken, profile, cb) => {
      console.log(idToken, profile);
      cb(null, idToken);
    }
  )
);
