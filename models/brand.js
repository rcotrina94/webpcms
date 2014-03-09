var slug = require('mongoose-slug-unique');

brandSchema = new Schema({
	name: {type: String, required:true},
	description : {type: String},
	products : {type: [Schema.Types.ObjectId], ref:'Product'}
});

brandSchema.plugin(slug('name'));

Brand = mongoose.model('Brand', brandSchema);