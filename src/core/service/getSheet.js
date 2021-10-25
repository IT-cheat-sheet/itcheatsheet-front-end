import axios from "axios";

export const getSubject = () => {
  return axios.get("/subject/getall");
};

export const getSemester = () => {
  return axios.get("/semester/getall");
};

export const getSpecificSheet = (id) => {
  return axios.get(`http://localhost:3000/summarypost/get/${id}`);
}

export const getSpecificPdf = (id) => {
  return axios.get(`http://localhost:3000/summarypost/getFile/${id}`)
}
