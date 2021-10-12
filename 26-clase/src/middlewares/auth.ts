import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FACEBOOK } from '../config/cfg';

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK.APP_ID,
      clientSecret: FACEBOOK.APP_SECRET,
      callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});

export default passport;
