const { Schema, model } = require('mongoose');
const { preparePublicSchema } = require('./common');
const { addressSchema } = require('./address-model');

const rideStatusEnum = {
    pending: 'PENDING',
    active: 'ACTIVE',
    finished: 'FINISHED'
};

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
        enum: Object.values(rideStatusEnum),
        default: rideStatusEnum.pending,
        required: true
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'RideComment'
    }],

    volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    }
});

preparePublicSchema(rideSchema);
const rideModel = model('Ride', rideSchema);

module.exports = { rideModel, rideStatusEnum };
