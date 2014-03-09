 express = require('express');
	http = require('http');
	path = require('path');
mongoose = require('mongoose');
validate = require('mongoose-validator').validate;
nunjucks = require('nunjucks');

	  app = express();
	   db = mongoose.connection;
   Schema = mongoose.Schema;

require('./config/main');

require('./routes/main');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Node server running. Port:' + app.get('port'));
});

require('./config/var')

console.log("Connecting to Mongo");

mongoose.connect('mongodb://localhost/webpcms');

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback () {
	// Models
	require('./models/brand');
	require('./models/product');
	require('./models/user');
});