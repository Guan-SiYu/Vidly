const Joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 10,
        },
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255,
        },
    })
)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(user, schema)
}

exports.Genre = User
exports.validate = validateUser
