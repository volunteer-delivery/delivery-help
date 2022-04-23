const { createServer } = require("http");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { driverRouter, rideRouter, authRouter } = require('./routers');
const { rideModel } = require('./models');
const { initializeSocketServer } = require('./socket');
const { initializeBotServer } = require('./bot');
const { seedData } = require('./seed');

async function bootstrap() {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT } = process.env;
    await mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_USERNAME}`);

    const rideCount = await rideModel.count();
    if (rideCount == 0) {
        await seedData();
    }

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1', driverRouter, rideRouter, authRouter);

    const httpServer = createServer(app);
    initializeSocketServer(httpServer);

    httpServer.listen(8080, () => {
        console.log('Server was started');
    });

    if (process.env.TELEGRAM_BOT_TOKEN) {
        initializeBotServer(process.env.TELEGRAM_BOT_TOKEN);
    }
}

bootstrap();
