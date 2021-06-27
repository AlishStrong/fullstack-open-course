import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => token = `bearer ${newToken}`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const updateBlog = async (blogToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config);
  return response.data;
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blogId}`, config);
};

const blogService = { setToken, getAll, createBlog, updateBlog, deleteBlog };
export default blogService;
