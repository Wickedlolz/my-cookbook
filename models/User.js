const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/util');

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.password);
};

userSchema.pre('save', async function () {
    this.password = await hashPassword(this.password);
});

const User = model('User', userSchema);

module.exports = User;
