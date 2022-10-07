const { Schema, model } = require('mongoose');
const { preparePublicSchema } = require('./common');

const rideCommentSchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        required: true
    }
});

preparePublicSchema(rideCommentSchema);
const rideCommentModel = model('RideComment', rideCommentSchema);

module.exports = { rideCommentModel };
