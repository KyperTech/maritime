var mongoose = require('mongoose');
mongoose.connect('mongodb://mvanlonden:Cactus1!humus@paulo.mongohq.com:10043/DrywallTester');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
  console.log('Mongoose is connected');
});

var siteSchema = mongoose.Schema({
	company: String
})

var Site = mongoose.model('Site', siteSchema);
var maritime = new Site({company: 'Maritime Autowash'});

maritime.save(function(err, maritime){
	if (err)
	maritime;
});