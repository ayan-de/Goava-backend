const passport = require("passport");
const User = require("../models/userOAuth");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "539837120579-hkrei0vfd54j2bio3j2vf204m3hsqfgg.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, next) => {
        console.log("MY PROFILE", profile._json.email);
        User.findOne({ email: profile._json.email }).then((user) => {
          if (user) {
            console.log("User already exits in DB", user);
            next(null, user);
            // cookietoken()
          } else {
            User.create({
              name: profile.displayName,
              googleId: profile.id,
              email: profile._json.email
            })
              .then((user) => {
                console.log("New User", user);
                next(null, user);
                // cookietoken()
              })
              .catch((err) => console.log(err));
          }
        });
  
        //   next();
      }
    )
  );