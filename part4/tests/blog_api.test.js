const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const config = require('../utils/config');

const api = supertest(app);
const blogsPath = config.BLOGS_PATH;

beforeEach( async () => {
	await Blog.deleteMany({});
	const blogPromises = helper.initialBlogs
		.map(b => new Blog(b))
		.map(b => b.save());
	await Promise.all(blogPromises);
});

test('all blogs are returned as json', async () => {
	const response = await api
		.get(blogsPath)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blog is created', async () => {
	const newBlog = {
		title: 'Testing NodeJS',
		author: 'Artur Clarke',
		url: 'https://nodejs-testing.com/testing-nodejs',
		likes: 12
	};

	await api
		.post(blogsPath)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	expect(blogsAtEnd.map(b => b.title)).toContain(newBlog.title);
});

afterAll(() => {
	mongoose.connection.close();
});
