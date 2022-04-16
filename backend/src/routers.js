const { Router } = require('express');
const { driverModel, rideModel } = require('./models');
const { broadcastNewRide } = require('./socket');
const { getRandomDriver, getRandomRides} = require('./seed');

const driverRouter = Router();

driverRouter.get('/drivers', async (req, res) => {
    const drivers = await driverModel.find({});
    res.send({ "drivers": drivers });
});

const rideRouter = Router();

rideRouter.get('/rides', async (req, res) => {
    const rides = await rideModel.find({}).populate('driver');
    res.send({ "rides": rides });
});

rideRouter.get('/rides/add-random', async (req, res) => {
    const driver = await driverModel.create(getRandomDriver());
    const ride = await rideModel.create({
        driver: driver._id,
        ...getRandomRides()
    });

    broadcastNewRide(ride);
    res.send({ "status": "success" });
});

module.exports = { driverRouter, rideRouter };
