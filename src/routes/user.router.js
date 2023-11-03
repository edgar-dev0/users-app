const { getAll, create, getOne, update } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route("/") // /users
		.get(getAll)
    .post(create);

userRouter.route("/:id") // /users/:id
.get(getOne)
.put(update);

module.exports = userRouter;