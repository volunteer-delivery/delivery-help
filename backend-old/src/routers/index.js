module.exports = {
    ...require('./driver-router'),
    ...require('./ride-router'),
    ...require('./auth-router'),
    ...require('./ride-comments-router'),
    ...require('./user-router')
};
