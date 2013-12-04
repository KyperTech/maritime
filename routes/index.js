
/*
 * GET home page.
 */
//var dbConfig = require("../app")(dbId);
//var dbId = dbConfig.dbId;
var dbId = "52995a14db7c24000000000d";
console.log(dbId);
exports.index = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			//console.log("you found it");
			/* This is an if statement to pick the page layout (one page or others)*/
			var layout = doc.layout
			if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			if (layout === "modBuis"){
				res.render('modBuis', {
				"com": doc,
				title: doc.company
				});
			}
			if (layout === "casBuis"){
				res.render('casBuis', {
				"com": doc,
				title: doc.company
				});
			}
			else{
				res.render('index', {
				"com": doc,
				title: doc.company
			})
			}
			console.log(layout)
		}); 
	};
};

exports.dash = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			var layout = doc.layout
			if (layout === "OnePage"){
				res.render('personal', {
				"com": doc
				});
			}
			if (layout === "modBuis"){
				res.render('modBuis', {
				"com": doc
				});
			}
			if (layout === "casBuis"){
				res.render('casAbout', {
				"com": doc
				});
			}
			else{
				res.render('index', {
				"com": doc
			})
			}
			console.log(layout)
		});
	};
};
exports.about = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			var layout = doc.layout
			if (layout === "OnePage"){
				res.render('personal', {
				"com": doc
				});
			}
			if (layout === "modBuis"){
				res.render('modAbout', {
				"com": doc
				});
			}
			//needs to be changed back to casAbout *****
			if (layout === "casBuis"){
				res.render('casAbout', {
				"com": doc
				});
			}
			else{
				res.render('index', {
				"com": doc
			})
			}
			console.log(layout)
		});
	};
};

exports.services = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			var layout = doc.layout
			if (layout === "OnePage"){
				res.render('personal', {
				"com": doc
				});
			}
			if (layout === "modBuis"){
				res.render('modServices', {
				"com": doc
				});
			}
			//needs to be changed back to casAbout *****
			if (layout === "casBuis"){
				res.render('modAbout', {
				"com": doc
				});
			}
			else{
				res.render('index', {
				"com": doc
			})
			}
		});
	};
};

exports.contact = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			res.render('contact', {
				"com": doc
			});
		});
	};
};
exports.portfolio = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			res.render('portfolio', {
				"com": doc
			});
		});
	};
};
exports.blog = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			res.render('blog', {
				"com": doc
			});
		});
	};
};

exports.login = function(db){
	return function(req, res){
		var user = req.body.user
		 ,  password = req.body.password;
		 


		var collection = db.get('user');

		collection.findById({
			_id: "528995605d7780a5d50002cd"
		},
			function(err, doc){
				
			}
		);
		res.redirect("/admin");
	}
}