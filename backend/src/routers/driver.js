const { Router } = require('express');
const { driverModel } = require('../models');

const driverRouter = Router();

driverRouter.get('/drivers', async (req, res) => {
    const drivers = await driverModel.find({});
    res.send({ 'drivers': drivers });
});

module.exports = { driverRouter };
