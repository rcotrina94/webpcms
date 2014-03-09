 express = require('express');
	http = require('http');
	path = require('path');
mongoose = require('mongoose');
validate = require('mongoose-validator').validate;
nunjucks = require('nunjucks');
// validator = require('validator');

	  app = express();
	   db = mongoose.connection;
   Schema = mongoose.Schema;

require('./config/main');

require('./routes/main');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Servidor Express ejecutándose. Puerto:' + app.get('port'));
});

require('./config/var')

console.log("Connecting to Mongo");

mongoose.connect('mongodb://localhost/webpcms');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Models
	require('./models/brand');
	require('./models/product');
	require('./models/user');
});