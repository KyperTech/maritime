
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://mvanlonden:Cactus1!humus@paulo.mongohq.com:10043/DrywallTester');
var SendGrid = require('sendgrid').SendGrid;
var Validator = require('validator').Validator;

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.csrf());
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.locals.pretty = true;
  sendgrid = {
    send: function(opts, cb) {
      console.log('Email:', opts);
      cb(true, opts);
    }
  };
});

app.configure('production', function() {
  app.use(express.errorHandler());
  sendgrid = new SendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
});

app.locals.errors = {};
app.locals.message = {};

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index(db));
app.get('/about', routes.about(db));
app.get('/services', routes.services(db));
app.get('/contact', routes.contact(db));
app.get('/blog', routes.blog(db));
app.get('/admin', routes.dash(db));
app.get('/build', routes.build(db));
/*
app.get('/users', user.list);
app.get('/helloworld', routes.helloworld);
app.get('/userlist', routes.userlist(db));
*/
app.get('/newuser', routes.newuser);
//app.get('/bootstrap', routes.bootstrap(db));

app.post('/edit', routes.edit(db));

function csrf(req, res, next) {
  res.locals.token = req.session._csrf;
  next();
}

function validate(message) {
  var v = new Validator()
    , errors = []
    ;

  v.error = function(msg) {
    errors.push(msg);
  };

  v.check(message.name, 'Please enter your name').len(1, 100);
  v.check(message.email, 'Please enter a valid email address').isEmail();
  v.check(message.message, 'Please enter a valid message').len(1, 1000);

  return errors;
}

function sendEmail(message, fn) {
  sendgrid.send({
    to: process.env.EMAIL_RECIPIENT
  , from: message.email
  , subject: 'Contact Message'
  , text: message.message
  }, fn);
}

app.get('/contact', csrf, routes.contact(db), function(req, res) {
  res.render('contact');
});

app.post('/contact', csrf, function(req, res) {
  var message = req.body.message
    , errors = validate(message)
    , locals = {}
    ;

  function render() {
    res.render('contact', locals);
  }

  if (errors.length === 0) {
    sendEmail(message, function(success) {
      if (!success) {
        locals.error = 'Error sending message';
        locals.message = message;
      } else {
        locals.notice = 'Your message has been sent.';
      }
      render();
    });
  } else {
    locals.error = 'Your message has errors:';
    locals.errors = errors;
    locals.message = message;
    render();
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
