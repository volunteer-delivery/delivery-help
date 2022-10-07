const { Router } = require('express');

const userRouter = Router();

userRouter.get('/user/current', (req, res) => res.json({ user: req.user }));

module.exports = { userRouter };
