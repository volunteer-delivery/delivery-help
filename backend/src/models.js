const mongoose = require('mongoose');

function preparePublicSchema(schema) {
    schema.virtual('id').get(function(){
        return this._id.toHexString();
    });
    schema.set('toJSON', {
        virtuals: true,
        transform: (doc, converted) => {
            delete converted._id;
            delete converted.__v;
        }
    });
}
function prepareInternalSchema(schema) {
    schema.set('toJSON', {
        transform: (doc, converted) => {
            delete converted._id;
            delete converted.__v;
        }
    });
}

const driverSchema = new mongoose.Schema({
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
    }
});

preparePublicSchema(driverSchema);

const addressSchema = new mongoose.Schema({
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

const rideSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
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

const driverModel = mongoose.model('Driver', driverSchema);
const rideModel = mongoose.model('Ride', rideSchema);

module.exports = { driverModel, rideModel };
