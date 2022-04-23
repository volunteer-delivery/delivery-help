const { Schema, model } = require('mongoose');
const { preparePublicSchema } = require('./common');
const { addressSchema } = require('./address-model');

const rideSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },

    from: {
        type: addressSchema,
        required: true
    },

    destination: {
        type: addressSchema,
        required: true
    },

    departureTime: {
        type: Date,
        required: true
    },

    vehicle: {
        type: String,
        enum: ['CAR', 'VAN', 'TRUCK'],
        required: false
    },

    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'FINISHED'],
        default: 'PENDING',
        required: true
    }
});

preparePublicSchema(rideSchema);
const rideModel = model('Ride', rideSchema);

module.exports = { rideModel };
