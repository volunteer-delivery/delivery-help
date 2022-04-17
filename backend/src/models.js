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
            delete converted._telegramId;
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
    },
    _telegramId: {
        type: String,
        required: false,
        default: null
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
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'FINISHED'],
        default: 'PENDING',
        required: true
    }
});

preparePublicSchema(rideSchema);

const telegramSessionSchema = mongoose.Schema({
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


const driverModel = mongoose.model('Driver', driverSchema);
const rideModel = mongoose.model('Ride', rideSchema);
const telegramSessionModel = mongoose.model('TelegramSession', telegramSessionSchema);

module.exports = { driverModel, rideModel, telegramSessionModel };
