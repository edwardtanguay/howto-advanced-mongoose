import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	url: String,
	email: {
		type: String,
		lowercase: true,
		validate: {
			validator: (v) =>
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
			message: '{VALUE} is not a valid email.',
		},
	},
});

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 255,
		trim: true,
	},
	description: String,
	numberOfPages: {
		type: Number,
		min: 10,
		max: 2000,
		required: true,
	},
	language: String,
	imageUrl: String,
	buyUrl: String,
	whenCreated: {
		type: Date,
		default: () => Date.now(),
	},
	relatedBook: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'book',
	},
	topics: [String],
	author: authorSchema,
});

export const Book = mongoose.model('book', bookSchema);
