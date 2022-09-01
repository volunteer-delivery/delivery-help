const bcrypt = require('bcryptjs');
const { userModel } = require('../models');
const { jwtService } = require('./jwt-service');

const { BACKEND_AUTH_EXPIRATION } = process.env;

const authService = {
    async validateCredentials(credentials) {
        if (!credentials.username || !credentials.password) return false;

        const user = await userModel.findOne({ name: credentials.username }).exec()
        const isCredentialsValid = user && await bcrypt.compare(credentials.password, user._password);

        return isCredentialsValid ? user : false;
    },

    generateToken(user) {
        return jwtService.encode({ userId: user.id }, {
            expiresIn: Number(BACKEND_AUTH_EXPIRATION)
        })
    }
};

module.exports = { authService };
