function presave(product){
	if (!product.details.longname){
		product.details.longname = product.name;
	}
	if (!product.price){
		product.price = product.base_price;
	}
	
	// console.log("Brand en Presave: "+product.brand);
/*	Brand.findById(product.brand, function (err, result){
		if (err) console.log(err);

		// console.log("Resultados del presave: "+result);

		if (result){
			product.brand_name = result.name;
		}
	});*/
	
	// console.log(product.brand);
}

var CustomDataSchema = new Schema ({
	key_name : String,
	value : Schema.Types.Mixed
});

productSchema = new Schema({
	sku: { type:String, required:true, unique:true},
	is_active: {type:Boolean, default:true},
	name: {type: String, required:true},
	base_price: {type:Number, required:true, default:0},
	price: {type:Number, default:0},
	stock: {type:Number, required:true, default:0},
	stock_unit: {type:String, default: "unid."},
	brand: {type: Schema.Types.ObjectId, ref:'Brand', required:true},
	brand_name: {type: String, required:true},
	details: {
		longname: String,
		description : String,
		images : {
			featured : String,
			secondary: String
		},
		dimensions:{
			height: Number,
			width: Number,
			depth: Number,
			unit: String
		},
		custom: [CustomDataSchema],
	},
	variants: {type: [Schema.Types.ObjectId], ref:'Product'},
	meta:{
		shipping_methods: {type: [String], enum:shipment_methods, default:shipment_methods},
		payment_methods: {type: [String], enum:payment_methods, default:payment_methods},
		category: [String],
		tags : [String],
		published_by : { type: Schema.Types.ObjectId, ref:'User' },
		published_date: { type:Date, default: Date.now },
		last_edited: { type:Date, default: Date.now },
		last_edited_by: { type: Schema.Types.ObjectId, ref:'User' },
	},
	sales: {type: Number, default:0, required:true}
});

/*productSchema.path('brand').set(function (namebrand) {
	// console.log("Nombre de marca: "+namebrand);
	var brandID;
	Brand.findOne({ 'name': namebrand }, 'id name', function (err, result){
		if (err) console.log(err);

		if (result){
			// console.log("Result: "+result);
			brandID =  result.id;
			
		} else {
			var newBrand = new Brand({name:namebrand});
			newBrand.save(function (err, newBrandID){
				console.log("newBrandID : "+newBrandID)
				brandID = newBrandID.id;
			});
		}
	});
	return mongoose.Types.ObjectId(brandID);
});*/
// console.log("Product Schema created");

productSchema.methods.show = function () {
	// console.log(this);
}

productSchema.pre('save', function(next) {
	presave(this);
	next();
});

Product = mongoose.model('Product', productSchema);