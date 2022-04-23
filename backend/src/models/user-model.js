const { Schema, model } = require('mongoose');
const { preparePublicSchema } = require('./common');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

preparePublicSchema(userSchema);

const userModel = model('User', userSchema);

module.exports = { userModel };
