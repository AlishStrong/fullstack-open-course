require('dotenv').config();

let PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;
const BLOGS_PATH = '/api/blogs';
const USERS_PATH = '/api/users';

module.exports = {
  MONGODB_URI,
  PORT,
  BLOGS_PATH,
  USERS_PATH
};
