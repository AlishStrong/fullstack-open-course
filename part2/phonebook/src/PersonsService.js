import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAllPeople = () => axios.get(baseUrl)
  .then(res => res.data)
  .catch(console.error);

const getPerson = personId => axios.get(`${baseUrl}/${personId}`)
  .then(res => res.data)
  .catch(console.error);

const createPerson = newPerson => axios.post(baseUrl, newPerson)
  .then(res => res.data)
  .catch(console.error);

const updatePerson = (personId, personData) => axios.put(`${baseUrl}/${personId}`, personData)
  .then(res => res.data)
  .catch(console.error);

const PersonsService = { getAllPeople, getPerson, createPerson, updatePerson };
export default PersonsService;
  