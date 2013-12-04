
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
var db = monk('mongodb://site:catlove1@dharma.mongohq.com:10094/Boilerplate');
var dbId = "52995a14db7c24000000000d";
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
  sendgrid = new SendGrid('mvanlonden', 'lamplamp1');
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
app.get('/porfolio', routes.portfolio(db));
//app.get('/bootstrap', routes.bootstrap(db));

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
    to: 'melvanlonden@gmail.com'
  , from: message.email
  , subject: 'Contact Message'
  , text: message.message
  }, fn);
}

app.post('/contact', csrf, function(req, res) {
  var message = req.body;
  console.log(message);
  var errors = validate(message)
    , locals = {}
    ;

  function render() {
    var collection = db.get('sites');
    collection.findOne({_id:dbId}).on('success', function(doc){
      res.render('contact', {
        "com": doc
      });
    });
  }
  
  if (errors.length === 0) {
    sendEmail(message, function(success) {
      if (!success) {
        locals.error = 'Error sending message';
        locals.message = message;
        console.log('message aint sendin');
      } 
      else {
        locals.notice = 'Your message has been sent.';
        console.log('sent');
      }
      render();
    });
  } else {
    locals.error = 'Your message has errors:';
    locals.errors = errors;
    locals.message = message;
    render();
    console.log('state of seige');
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
