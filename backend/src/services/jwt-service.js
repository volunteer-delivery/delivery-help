const jwt = require('jsonwebtoken');

const { BACKEND_SECRET } = process.env;

const jwtService = {
    generate(payload, options = null) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, BACKEND_SECRET, options, (error, token) => {
                error ? reject(error) : resolve(token);
            });
        });
    }
};

module.exports = { jwtService };
