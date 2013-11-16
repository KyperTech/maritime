
/*
 * GET home page.
 */


exports.helloworld = function(req, res){
  res.render('helloworld', {title: 'Hello, World!'});
};

exports.userlist = function(db){
	return function(req, res){
		var collection = db.get('usercollection');
		collection.find({},{},function(e,docs){
			res.render('userlist', {
				"userlist": docs
			});
		});
	};
};

exports.newuser = function(req, res){
	res.render('newuser', {title: 'Add New User'});
};

exports.bootstrap = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('bootstrap', {
				"bootstrap": docs
			});
		});
	};
};

exports.index = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('index', {
				"index": docs
			});
		});
	};
};

exports.about = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('about', {
				"index": docs
			});
		});
	};
};

exports.services = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('services', {
				"index": docs
			});
		});
	};
};

exports.contact = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('contact', {
				"index": docs
			});
		});
	};
};

exports.blog = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('blog-home-1', {
				"index": docs
			});
		});
	};
};

/*exports.sendEmail = function(req, res){
	server.send({
   		text:    "i hope this works", 
   		from:    "melvanlonden@gmail.com", 
   		to:      "",
   		cc:      "",
   		subject: "testing emailjs"
	}, function(err, message) { console.log(err || message); });
};*/

exports.adduser = function(db){
	return function(req, res){
		var userName = req.body.username;
		var userEmail = req.body.useremail;

		var collection = db.get('usercollection');

		collection.insert({
			"username": userName,
			"email" : userEmail
		}, function (err, doc){
			if (err) {
				res.send("There was a problem adding the information to the database")
			}
			else {
				res.redirect("userlist");
				res.location("userlist");
			}
		});
	}
}