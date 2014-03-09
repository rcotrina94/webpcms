userSchema = new Schema({
	name:   { type:String, required: true},
	email:  { type:String, required: true, validate: [ /\S+@\S+\.\S/, 'E-mail no válido.' ]},
	role:   { type:String, enum:roles, default:"user"},
	active: { type:Boolean, default:false},
});

User = mongoose.model('User', userSchema);