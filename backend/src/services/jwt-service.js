const jwt = require('jsonwebtoken');

const { BACKEND_SECRET } = process.env;

const jwtService = {
    encode(payload, options = null) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, BACKEND_SECRET, options, (error, token) => {
                error ? reject(error) : resolve(token);
            });
        });
    },

    decode(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, BACKEND_SECRET, null, (error, decoded) => {
                error ? reject(error) : resolve(decoded);
            });
        });
    },

    decodeOrNull(token) {
        return this.decode(token).catch(() => null);
    }
};

module.exports = { jwtService };
