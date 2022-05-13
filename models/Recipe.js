const { Schema, model, Types } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (image) {
                return image.startsWith('http') || image.startsWith('https');
            },
            message: (props) => `${props.value} is not valid image url.`,
        },
    },
    ingredients: {
        type: [String],
        required: true,
    },

    steps: {
        type: [String],
        required: true,
    },

    createdOn: {
        type: String,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
    },
    comments: {
        type: [Types.ObjectId],
        ref: 'Comment',
    },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
