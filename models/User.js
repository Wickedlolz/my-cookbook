const { Schema, model } = require('mongoose');
const { comparePassword, hashPassword } = require('../services/util');

const userSchema = new Schema({
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

const User = model('User', userSchema);

module.exports = User;
