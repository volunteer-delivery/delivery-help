const { Router } = require('express');
const { driverModel, rideModel } = require('./models');

const driverRouter = Router();

driverRouter.get('/drivers', async (req, res) => {
    const drivers = await driverModel.find({});
    res.send({ "drivers": drivers });
});

const rideRouter = Router();

rideRouter.get('/rides', async (req, res) => {
    const rides = await rideModel.find({}).populate('driver')
    res.send({ "rides": rides });
});

module.exports = { driverRouter, rideRouter };
