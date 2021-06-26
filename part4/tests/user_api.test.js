const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./user_test_helper');
const config = require('../utils/config');

const api = supertest(app);
const usersPath = config.USERS_PATH;

beforeEach(async () => {
  await User.deleteMany({});
  const userPromises = helper.initialUsers
    .map(b => new User(b))
    .map(b => b.save());
  await Promise.all(userPromises);
});

test('users are returned without password attributes', async () => {
  const response = await api
    .get(usersPath)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialUsers.length);

  const randomIndex = Math.floor(Math.random() * response.body.length);
  const randomUser = response.body[randomIndex];
  expect(randomUser.password).not.toBeDefined();
});


test('user is created', async () => {
  const newUser = {
    username: 'new_user',
    name: 'New User',
    password: 'password'
  };

  const response = await api
    .post(usersPath)
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.username).toBe(newUser.username);
  expect(response.body.name).toBe(newUser.name);
  expect(response.body.password).not.toBeDefined();

  const usersInDb = await api.get(usersPath);

  expect(usersInDb.body).toHaveLength(helper.initialUsers.length + 1);
  expect(usersInDb.body.map(u => u.username)).toContain(response.body.username);
});

afterAll(() => {
  mongoose.connection.close();
});
