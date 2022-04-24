const { jwtService } = require('../services');
const { userModel } = require('../models');

async function authMiddleware(req, res, next) {
    if (req.path.startsWith('/auth')) return next();

    const token = req.signedCookies['dh.auth'];
    const tokenPayload = token && await jwtService.decodeSafe(token);

    if (!tokenPayload) {
        return res.status(403).send();
    }

    req.user = await userModel.findById(tokenPayload.userId).exec();
    next();
}

module.exports = { authMiddleware };
