const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const getAllUsers = async (_, response) => {
  const users = await User.find({});
  response.json(users);
};

const createUser = async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  });

  const savedUser = await user.save();

  response.json(savedUser);
};

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;
