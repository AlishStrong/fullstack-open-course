const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

const getAllBlogs = async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
};

const createBlog = async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user);
  const blog = new Blog({ ...body, user: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
};

const updateBlog = async (request, response) => {
  const body = request.body;



  const blog = {
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog.toJSON());
};

const deleteBlog = async (request, response) => {
  const blogsId = new mongoose.Types.ObjectId(request.params.id);

  await Blog.deleteOne({ _id: blogsId, user: request.user });
  response.status(204).end();
};

blogsRouter.get('/', getAllBlogs);
blogsRouter.post('/', createBlog);
blogsRouter.put('/:id', updateBlog);
blogsRouter.delete('/:id', deleteBlog);

module.exports = blogsRouter;
