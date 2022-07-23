const { Router } = require('express');
const { rideModel, rideCommentModel } = require('../models');
const { broadcastNewRideComment } = require('../socket');

const rideCommentsRouter = Router();

function fetchRide(rideId) {
    return rideModel.findById(rideId).populate({
        path: 'comments',
        options: {
            sort: { createdAt: -1 }
        },
        populate: 'author'
    });
}

rideCommentsRouter.get('/rides/:id/comments', async (req, res) => {
    const ride = await fetchRide(req.params.id);

    if (!ride) {
        return res.status(404).send({ 'message': 'Ride not found' });
    }

    res.send(ride.comments);
})

rideCommentsRouter.post('/rides/:id/comments', async (req, res) => {
    const ride = await fetchRide(req.params.id);

    if (!ride) {
        return res.status(404).send({ 'message': 'Ride not found' });
    }

    const created = await rideCommentModel.create({
        createdAt: new Date(),
        author: req.user.id,
        text: req.body.text
    })
    const comment = await rideCommentModel.populate(created, 'author');

    await rideModel.updateOne({ _id: ride.id }, {
        $push: { comments: comment.id },
    });

    broadcastNewRideComment(ride.id, comment);

    res.send({ success: true });
})

module.exports = { rideCommentsRouter };
