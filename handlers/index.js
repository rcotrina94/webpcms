exports.index = function(req, res){
	Product.find( { is_active: true }, function (err, products){
		if (err){
			return res.send("Un error ha ocurrido");
		} else {
			res.render('root/index.html',
				{
					title : 'Catálogo online',
					products : products
				}
			);
		}
	});
};