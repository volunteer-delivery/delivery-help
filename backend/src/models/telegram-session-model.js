const { Schema, model } = require('mongoose');

const telegramSessionSchema = Schema({
    _telegramId: {
        type: String,
        required: true,
        unique: true
    },

    process: {
        type: String,
        enum: ["IDLE", "USER_REGISTRATION", "RIDE_REGISTRATION"],
        default: "IDLE",
        required: true
    },

    step: {
        type: Number,
        required: false
    },

    name: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    fromCountry: {
        type: String,
        required: false
    },

    fromCity: {
        type: String,
        required: false
    },

    destinationCity: {
        type: String,
        required: false
    },

    departureTime: {
        type: String,
        required: false
    },

    vehicle: {
        type: String,
        enum: ['CAR', 'VAN', 'TRUCK'],
        required: false
    }
});

const telegramSessionModel = model('TelegramSession', telegramSessionSchema);

module.exports = { telegramSessionModel };
