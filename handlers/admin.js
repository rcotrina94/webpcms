exports.index = function(req, res){
	Product
		.find({is_active:true})
		.sort({sales:-1})
		.limit(10)
		.exec(function (err, products){
			if (err){
				return res.send("Un error ha ocurrido");
			} else {
				res.render('admin/dashboard.html', {
					title: 'Escritorio',
					products: products,
					active: 'dashboard'
				});
			}
		});
};

exports.product_list = function(req, res){
	Product.find({}, function (err, products){
		if (err){
			return res.send("Un error ha ocurrido");
		} else {
			Product.count({is_active:true}, function(err, count){
			    if (err){
			    	return res.send("Un error ha ocurrido");
			    } else {
			    	res.render('admin/products/list.html', {
			    		title: 'Lista de Productos',
			    		products: products,
			    		products_active: count,
			    		active: 'product_list'
			    	});
			    }
			});
		}
	});
};

exports.new_product = function(req, res){
	if (req.method == 'GET'){
		Brand.find({}, function (err, brands){
			if (err){
				return res.send("Un error ha ocurrido");
			} else {
				res.render('admin/products/new.html', {
					title: 'Nuevo Producto',
					brands: brands,
					active: 'new_product',
					msg: null,
				});
			}
		});
		
	} else if (req.method == 'POST') {
		var isNewBrand = false;
		var product = req.body;
		var newProduct = new Product(product);
		var namebrand = product.brand_name;
		var brandID;

		Brand.findOne({ 'name': namebrand }, 'id name', function (e, result){
			var productSave = function(){

				newProduct.save(function (err, product){
					if (err) {
						if(brandID && isNewBrand){
							Brand.remove({_id:brandID}, function(re, callback){
								if (re) {console.log(re);}
								console.log("Marca eliminada por error al guardar producto: "+brandID)
							});
						}
						console.log(err);
						Brand.find({}, function (error, brands){
							if (error){
								console.log(error);
							} 
							return res.render('admin/products/new.html', {
								title: 'Nuevo Producto',
								brands: brands,
								active: 'new_product',
								msg:{
									title:'Error registrando producto',
									body:{
										errors: err.errors
									}
								}
							});
						});
					} else {
						console.log("Added product (ID: '"+newProduct._id+"') to Brand "+"(ID: "+brandID+")");
						
						Brand.update({_id:brandID},{$push:{products:newProduct._id} },{},function(errorb, data){
							if (errorb){ console.log(errorb);} else {
								Brand.find({}, function (error, brands){
									if (error){
										console.log(error);
									} 
									return res.render('admin/products/new.html', {
										title: 'Nuevo Producto',
										brands: brands,
										active: 'new_product',
										msg:{
											title:error?'Error registrando producto':'Producto registrado correctamente',
											body:error?error:newProduct.name,
										}
									});
								});	
							}							
						});
					}
				});
			}

			if (e) {
				console.error(e);
			}

			if (result){
				newProduct.brand = result._id;
				brandID = result._id;
				productSave();
			} else {
				var newBrand = new Brand({name:namebrand});
				newProduct.brand = newBrand._id
				newBrand.save(function (er, newBrandID){
					if (er) {
						console.log(er);
					} else {
						// console.log("newBrandID : "+newBrandID)
						brandID = newBrandID.id;
						isNewBrand = true;
						console.log("Marca creada: "+brandID)
					}
					productSave();
				});
			}
		});
	}
};


exports.brand_list = function(req,res){
	Brand.find({}, function (e, brands){
		if (e){
			console.log(e);
		} 
		return res.render('admin/brands/list.html', {
			title: 'Lista de Marcas registradas',
			brands: brands,
			active: 'brand_list',
		});
	});
}

exports.new_brand = function(req,res){
	var title = 'Registrar Marca';
	
	if (req.method == 'GET'){

		res.render('admin/brands/new.html', {
			title: title,
			active: 'new_brand',
			msg: null
		});

	} else if (req.method == 'POST') {
		var brand = req.body;
		var newBrand = new Brand(brand);
			
		newBrand.save(function (error){
			if (error) {
				console.log(error)
			} else {
				console.log("Added brand (ID: '"+newBrand._id+"')");
			}
			
			if(error && error.name == "MongoError"){
				error = {
					"message": "Validation failed",
					"name": "ValidationError",
					"errors": {
						"slug_pre": {
							"message": "Path `slug` is duplicated.",
							"name": "ValidatorError",
							"path": "slug",
							"type": "duplicated",
							"value": ""
						}
					}
				}
			}

			return res.render('admin/brands/new.html', {
				title: title,
				active: 'new_brand',
				msg:{
					error: error?true:false,
					title: error?'Error registrando marca':'Marca registrada correctamente',
					body:  error?error:newBrand,
					data_sent: error?brand:null
				}
			});
			
		});

	}

}