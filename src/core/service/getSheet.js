import axios from "axios";

export const getSubject = () => {
  return axios.get("/subject/getall");
};

export const getSemester = () => {
  return axios.get("/semester/getall");
};