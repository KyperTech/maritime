
/*
 * GET home page.
 */
//var dbConfig = require("../app")(dbId);
//var dbId = dbConfig.dbId;
//Heroku variable holds database id number (Exec command must still be written)
var dbId = process.env.DBID || '52b4ab1bcaefb4080000000f';
//console.log('DBID:' + process.env.DBID);
 
exports.index = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			//console.log("you found it");
			/* This is an if statement to pick the page layout (one page or others)*/
			var layout = doc.layout
			if (layout === "clean"){
				res.render('cleanHome', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modBuis', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "casBuis"){
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

exports.about = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
			var layout = doc.layout
			if (layout === "clean"){
				res.render('cleanAbout', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modAbout', {
				"com": doc
				});
			}
			else if (layout === "casBuis"){
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
			console.log(layout)
			if (layout === "clean"){
				res.render('cleanServices', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modServices', {
				"com": doc
				});
			}
			else if (layout === "casBuis"){
				res.render('casServices', {
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
			var layout = doc.layout
			console.log(layout)
			if (layout === "clean"){
				res.render('cleanContact', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modContact', {
				"com": doc
				});
			}
			else if (layout === "casBuis"){
				res.render('modContact', {
				"com": doc
				});
			}
			else{console.log('wrong render')
				res.render('index', {
				"com": doc
			})
			}
		});
	};
};
exports.portfolio = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
		var layout = doc.layout
			if (layout === "clean"){
				res.render('cleanPort', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modPort3', {
				"com": doc
				});
			}
			else if (layout === "casBuis"){
				res.render('casPort', {
				"com": doc
				});
			}
			else{
				res.render('modPort', {
				"com": doc
			})
			}
		});
	};
};

exports.loadProject = function(db){
  return function(req, res, next, id){
    var collection = db.get('sites');
    collection.findOne({'portfolio._id':id}).on('success', function (doc){
    	console.log(doc);
      req.project = doc;
      next();
    })
  }
}

exports.project = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
		var layout = doc.layout
			if (layout === "clean"){
				res.render('cleanPort', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modPortItem', {
				"project": req.project,
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "casBuis"){
				res.render('casPort', {
				"com": doc
				});
			}
			else{
				res.render('modPort', {
				"com": doc
			})
			}
		});
	};
};
exports.blog = function(db){
	return function(req, res){
		var collection = db.get('sites');
		collection.findOne({_id:dbId}).on('success', function(doc){
		var layout = doc.layout
			if (layout === "clean"){
				res.render('cleanBlog', {
				"com": doc,
				title: doc.company,
				site: dbId
				});
			}
			else if (layout === "OnePage"){
				res.render('personal', {
				"com": doc,
				title: doc.company
				});
			}
			else if (layout === "modBuis"){
				res.render('modBlog', {
				"com": doc
				});
			}
			//needs to be changed back to casAbout *****
			else if (layout === "casBuis"){
				res.render('casBlog', {
				"com": doc
				});
			}
			else{
				res.render('modBlog', {
				"com": doc
			})
			}
		});
	};
};