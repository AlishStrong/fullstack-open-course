import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => token = `bearer ${newToken}`;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

const blogService = { setToken, getAll, createBlog, updateBlog };
export default blogService;
