exports.list = function(req, res){

	Product.find({}, function (err, products){
		if (err){
			return res.send("Un error ha ocurrido");
		} else {
			res.render('product_list', {
				title: 'Lista de Productos',
				products: products
			});
		}
	});
};

exports.newform = function(req, res){
	res.render('new_product', {
		title: 'Crear nuevo Producto'
	});
};

exports.addnew = function(req, res){
	
	var product = req.body;

	var newProduct = new Product(product);

	var namebrand = product.brand_name;

	Brand.findOne({ 'name': namebrand }, 'id name', function (err, result){
		if (err) {
			console.error(err);
		} else {

			if (result){
				newProduct.brand = result._id;
			} else {
				var newBrand = new Brand({name:namebrand});
				newProduct.brand = newBrand._id
				newBrand.save(function (err, newBrandID){
					// console.log("newBrandID : "+newBrandID)
					brandID = newBrandID.id;
				});
			}

			newProduct.save(function (error, product){
				if (error) {
					console.log(error);
					return res.render('new_product', {
						title: 'Crear nuevo Producto',
						msg:{
							title:'Error registrando el producto.',
							body:error,
						}

					});
				} else {
					console.log("Added product (ID: '"+newProduct._id+"')");
					return res.redirect('/products/new'/*, {
						title: 'Crear nuevo Producto',
						msg:{
							title:'Producto registrado correctamente',
							body:newProduct.name,
						}
					}*/);
				}
			});
		}
		

		
	});
	
};