
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('root/index.html', { title: 'Catálogo online' });
};