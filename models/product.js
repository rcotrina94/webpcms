function presave(product){
	if (!product.details.longname){
		product.details.longname = product.name;
	}
	if (!product.price){
		product.price = product.base_price;
	}
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

productSchema.pre('save', function(next) {
	presave(this);
	next();
});

Product = mongoose.model('Product', productSchema);