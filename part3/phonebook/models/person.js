const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
	.connect(url)
	.then((res) => console.log(`Connected to MongoDB`))
	.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`))

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		required: true,
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d+$/.test(v)
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
})

personSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

module.exports = mongoose.model('Person', personSchema)
