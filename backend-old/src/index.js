const { createServer } = require("http");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorTracker } = require('./services');
const { driverRouter, rideRouter, authRouter, rideCommentsRouter, userRouter } = require('./routers');
const { rideModel } = require('./models');
const { initializeSocketServer } = require('./socket');
const { initializeBotServer } = require('./bot');
const { seedData } = require('./seed');
const { authMiddleware } = require('./middlewares');

const { MONGO_URL, BACKEND_SECRET, BACKEND_ENV, TELEGRAM_BOT_TOKEN, FRONTEND_ORIGIN } = process.env;

async function bootstrap() {
    await mongoose.connect(MONGO_URL);

    if (BACKEND_ENV !== 'production') {
        const rideCount = await rideModel.count();

        if (!rideCount) await seedData();
    }

    const app = express();

    errorTracker.initRequestHandler(app);
    app.use(cookieParser(BACKEND_SECRET));
    app.use(express.json());
    app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

    app.use('/api/v1', authMiddleware);
    app.use('/api/v1', driverRouter, rideRouter, authRouter, rideCommentsRouter, userRouter);

    errorTracker.initErrorHandler(app);
    const httpServer = createServer(app);

    initializeSocketServer(httpServer);

    httpServer.listen(8080, () => {
        console.log([
            '',
            'Server was started',
            `time: ${new Date().toLocaleTimeString()}`
        ].join('\n'));
    });

    if (TELEGRAM_BOT_TOKEN) {
        initializeBotServer(TELEGRAM_BOT_TOKEN);
    }
}

bootstrap();
