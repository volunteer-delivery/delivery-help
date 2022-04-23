const { Router } = require('express');

const authRouter = Router();

authRouter.post('/auth/sign-in', (req, res) => {
    res.json({ success: true });
});

module.exports = { authRouter };
