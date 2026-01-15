const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {

  let user = await User.findOne({ email: profile.emails[0].value });

  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    });
  }

 return done(null, user);
}));
