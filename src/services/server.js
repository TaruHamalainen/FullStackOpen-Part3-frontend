import axios from "axios";
const baseURL = "https://phonebook-jtyg.onrender.com/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const add = (newPerson) => {
  return axios.post(baseURL, newPerson);
};

const update = (id, newPerson) => {
  return axios.put(`${baseURL}/${id}`, newPerson);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default {
  getAll: getAll,
  add: add,
  update: update,
  remove: remove,
};
