import axios from "axios";

const baseUrl = '/api/persons';

const getAllPeople = () => axios.get(baseUrl)
  .then(res => res.data)
  .catch(console.error);

const getPerson = personId => axios.get(`${baseUrl}/${personId}`)
  .then(res => res.data)
  .catch(console.error);

const createPerson = newPerson => {
  return axios.post(baseUrl, newPerson)
  .then(res => {
    return res.data;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
}

const updatePerson = (personId, personData) => axios.put(`${baseUrl}/${personId}`, personData)
  .then(res => res.data)
  .catch(error => {
    console.error(error);
    throw error;
  });

const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`)
.then(res => res.data)
.catch(console.error);

const PersonsService = { getAllPeople, getPerson, createPerson, updatePerson, deletePerson };
export default PersonsService;
  