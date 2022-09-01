const { jwtService } = require('../services');
const { userModel } = require('../models');

async function authMiddleware(req, res, next) {
    if (req.path.startsWith('/auth')) return next();

    const token = req.signedCookies['dh.auth'];
    const tokenPayload = token && await jwtService.decodeOrNull(token);
    const user = tokenPayload && await userModel.findById(tokenPayload.userId).exec();

    if (!user) {
        res.clearCookie('dh.auth');
        res.clearCookie('dh.session');
        return res.status(403).send();
    }

    req.user = user;
    next();
}

module.exports = { authMiddleware };
