const { Schema, model } = require('mongoose');

const recipeSchema = Schema({
    name: {
        type: String,
        required: true,
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
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    steps: [
        {
            type: String,
            required: true,
        },
    ],
    createdOn: {
        type: String,
    },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
