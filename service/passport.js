const LocalStrategy = require('passport-local').Strategy;
//const User = require('./models/User'); // Assuming you have a User model defined
exports = module.exports = function(app, passport){


passport.use(new LocalStrategy(
  function(username, password, done) {
    app.db.models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      app.db.models.User.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    app.db.models.User.findById(id, function(err, user) {
    done(err, user);
  });
});

};