
/*
 * GET home page.
 */


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
exports.dash = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('dash', {
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

exports.build = function(db){
	return function(req, res){
		var collection = db.get('projects');
		collection.find({},{},function(e,docs){
			res.render('siteEdit', {
				"index": docs
			});
		});
	};
};

exports.adduser = function(db){
	return function(req, res){
		var checkToBool = function(check){
			if (check === "on"){
				check = true;
			}
			else{
				check = false;
			}
			return check;
		};

		var company = req.body.company
		 ,  email = req.body.email
		 ,  street = req.body.address
		 ,  city = req.body.city
		 ,  state = req.body.state
		 ,  zip = req.body.zip
		 ,  phone = req.body.phone
		 ,  about = checkToBool(req.body.about)
		 ,  services = checkToBool(req.body.services)
		 ,  contact = checkToBool(req.body.contact)
		 ,  blog = checkToBool(req.body.blog)
		 ,  portfolio = checkToBool(req.body.portfolio)
		 ,  style = req.body.style;


		var collection = db.get('projects');

		collection.findAndModify({
			_id: "5283fde7843852aa6c000544"
		},
			{ $set: {
				"company": company,
				"contact.address": street,
				"contact.city": city,
				"contact.state": state,
				"contact.zip": zip,
				"contact.phone": phone,
				"contact.email": email,
				"navTab.about": about,
				"navTab.services": services,
				"navTab.contact": contact,
				"navTab.blog": blog,
				"navTab.portfolio": portfolio,
				"style": style
			}}
		);

		res.redirect("/build");

		/*collection.insert({
			"username": userName,
			"email" : userEmail
		}, function (err, doc){
			if (err) {
				res.send("There was a problem adding the information to the database")
			}
			else {
				res.redirect("services");
				res.location("services");
			}
		});*/
	}
}