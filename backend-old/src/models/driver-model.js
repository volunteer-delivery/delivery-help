const { Schema, model } = require('mongoose');
const { preparePublicSchema } = require('./common');

const driverSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    grade: {
        type: String,
        enum: ['VERIFIED', 'NOT VERIFIED'],
        default: 'NOT VERIFIED',
        required: true
    },

    _telegramId: {
        type: String,
        required: false,
        default: null
    }
});

preparePublicSchema(driverSchema);

const driverModel = model('Driver', driverSchema);

module.exports = { driverModel };
