app.set('port', process.env.PORT || 3000);

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
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