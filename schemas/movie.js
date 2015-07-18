var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	director: String,
	title: String,
	lang: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}

	}

})

MovieSchema.pre('save', function (next) {
	if(this.isNew){
		this.meta.createAt= this.meta.updateAt = Date.now()
	} else {
		this.updateAt = Date.now()
	}

	next()
})

MovieSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb)
	},
	findById: function(id,cb){
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = MovieSchema