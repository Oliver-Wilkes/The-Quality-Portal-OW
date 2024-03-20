'use strict';

//dependencies
var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    helmet = require('helmet'),
    csrf = require('csurf'),
    crypto = require('crypto'),
    mongoSanitize = require('express-mongo-sanitize'),
    { xss } = require('express-xss-sanitizer');


//create express app
var app = express();

//setup the web server
var nonce = crypto.randomBytes(16).toString("hex");

//setup the web server
app.server = http.createServer(app);
//response locals

app.use(function(req, res, next) {
  res.locals.user = {};
  res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  res.locals.nonce = nonce;
  next();
});

//app.use(helmet());
/*
app.use(function(req, res, next){
  helmet({
    contentSecurityPolicy: {
      directives:{
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src":["'self'", "'nonce-" + res.locals.nonce + "'", "'unsafe-eval'", "'unsafe-inline'"],
      }
    }
  });
  next();
});
*/
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "'unsafe-eval'", "'unsafe-inline'"]
      }
    }
  })
);
//setup mongoose
app.db = mongoose.createConnection("mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5");

app.db.on('error', function(err){
  console.log('Mongo connection error...');
  console.log(err);
  // This is an attempt to fix the mongo connection errors that happen on a restart after crashing.
  // This should trigger a crash so pm2 will restart until mongo connection is established.
  process.exit(2);
});

app.db.once('open', function () {
  //we now have a data store
  console.log('Mongo connection successful');
});

//COME BACK TO THIS TO MAKE SCHEMAS FOR DIFFERENT DATA TYPES
//config data models
require('./models')(app, mongoose);

//settings
app.disable('x-powered-by');
app.disable('X-Powered-By');

//middleware     - this is where a middleware logging file is added to the app
//app.use(require('morgan')('dev'));

//app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, 'the-quality-portal-client/dist')));
app.use(require('serve-static')(path.join(__dirname, 'the-quality-portal-client/public')));

app.use(require('method-override')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser('hdsajk9980sjlk'));

app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: 'hdsajk9980sjlk',
   store: mongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/mongo?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5", ttl: 24*60*60 }), // 1 day
   proxy: true,
   cookie:{
     path: "/",
     httpOnly: true,
 		 secure: true,
     maxAge: 28800000,  // 1800000 = 30 minutes 28800000 = 8 hrs
     sameSite: 'strict'
   }
}));

app.use(passport.initialize());
app.use(passport.session());

// $ and . are removed from any key in objects found in req.body, req.query, req.headers and req.params
app.use(mongoSanitize({
  dryRun: false,  // switch on to log when found but don't remove
  onSanitize: function(data){
    console.log('This request [' + data.key + '] has been sanitised.');
    console.log(data.req[data.key]);
  }
}));
// Sanitises input to protext against xss attacks found in req.body, req.query, req.headers and req.params
app.use(xss({
  allowedKeys: ['password', 'Password', 'token', 'cookie']
}));

//global locals
app.locals.projectName = "The Quality Portal";
app.locals.copyrightYear = new Date().getFullYear();
app.locals.copyrightName = "Integrity Print";
app.locals.cacheBreaker = 'br34k-01';

//setup passport
require('./service/passport')(app, passport);

//setup routes for express
require('./routes/routes')(app, passport);
 
//setup utilities
app.utility = {};


app.server.listen({ port: 8080, host: 'localhost'}, function(){
  app.server.timeout = 5200000;
  console.log("listening on port 8080");
});
