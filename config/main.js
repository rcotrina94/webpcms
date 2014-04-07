app.set('port', process.env.PORT || 3000);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.compress()); 

/* Compress response data with gzip / deflate.
This middleware should be placed "high" within
the stack to ensure all responses may be compressed.
*/

app.set("case sensitive routing", true);
app.set('strict routing', true);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
/*app.use(express.methodOverride());*/
app.use(express.cookieParser('thisIsAsecretKEY'));
app.use(express.session({secret:"thisIsAsecretKEY"}));
app.use(app.router);
app.use(express.static('public'));

app.use(function(req, res, next) {
	if (req.path.substr(-1) == '/' && req.path.length > 1) {
		var query = req.url.slice(req.path.length);
		res.redirect(301, req.path.slice(0, -1) + query);
	} else {
		next();
	}
});

app.use(function(req, res, next){
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    res.render('404.html', { title: 'Error 404', url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


app.locals({
    fn:{
        isIn : function (key, array){
            var arr = array.split(",");
            if( arr.indexOf(key) > -1 ) {
                return true;
            } else {
                return false
            }
        },
        toString: function(obj){
            return JSON.stringify(obj);
        }
    },
    site: {
        title: 'webPCMS',
        description: ''
    },
    author: {
        name: '',
        contact: ''
    }
});

// development only
app.configure('development', function() {
    var edt = require('express-debug');
    edt(app, {/* settings */});
});

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}