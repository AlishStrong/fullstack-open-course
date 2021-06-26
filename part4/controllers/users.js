const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const getAllUsers = async (_, response) => {
  const users = await User.find({});
  response.json(users);
};

const createUser = async (request, response) => {
  const body = request.body;
  if (body.password && body.username) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } else {
    if (!body.password && !body.username) {
      response.status(400).json({ error: 'username and password were not provided' });
    } else if (!body.username) {
      response.status(400).json({ error: 'username was not provided' });
    } else {
      response.status(400).json({ error: 'password was not provided' });
    }
  }
};

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;
