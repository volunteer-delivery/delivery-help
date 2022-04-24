const { Schema } = require('mongoose');
const { prepareInternalSchema } = require('./common');

const addressSchema = new Schema({
    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: false
    }
});

prepareInternalSchema(addressSchema);

module.exports = { addressSchema };
