exports.mailSend = function(){
  return function csrf(req, res, next) {
    res.locals.token = req.session._csrf;
    next();
  }

  return function validate(message) {
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

  return function sendEmail(message, fn) {
    sendgrid.send({
      to: process.env.EMAIL_RECIPIENT
    , from: message.email
    , subject: 'Contact Message'
    , text: message.message
    }, fn);
  }
};