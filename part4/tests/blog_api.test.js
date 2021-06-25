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

	const result = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(result.body.id).toBeDefined();

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	expect(blogsAtEnd.map(b => b.title)).toContain(newBlog.title);
});

test('Blog.likes propperty defaults to 0', async () => {
	const newBlog = {
		title: 'Default property test',
		author: 'Artur Clarke',
		url: 'https://nodejs-testing.com/default-property'
	};

	const result = await api
		.post(blogsPath)
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(result.body.likes).toBeDefined();
	expect(result.body.likes).toBe(0);
});

test('Fails if title and url property values are missing', async () => {
	const newBlog = {
		author: 'Artur Clarke'
	};

	const result = await api
		.post(blogsPath)
		.send(newBlog)
		.expect(400);

	expect(result.body.error).toBeDefined();
	expect(result.body.error).toContain('validation failed');
});

afterAll(() => {
	mongoose.connection.close();
});
