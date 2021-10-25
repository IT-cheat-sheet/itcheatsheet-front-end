import axios from "axios";

export const getSubject = () => {
  return axios.get("/subject/getall");
};

export const getSemester = () => {
  return axios.get("/semester/getall");
};

export const getTopic = () => {
  return axios.get("http://localhost:3000/topic/getAll");
}

export const getReview = (page, pageSize, searchWord, filter) => {
  return axios.get(`http://localhost:3000/review/getAll?page=${page - 1}&pageSize=${pageSize}&searchWord=${searchWord}&sortTopic=${filter}&sortDesc=true`);
};

export const getReport = (filter, searchWord, readPage, token) => {
  return axios.get(`http://localhost:3000/report/getAll?sortBy=${filter}&search=${searchWord}&readStatus=${readPage ? 1 : 0}`,
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};