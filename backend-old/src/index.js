async function bootstrap() {
    errorTracker.initRequestHandler(app);

    errorTracker.initErrorHandler(app);
    const httpServer = createServer(app);
}
