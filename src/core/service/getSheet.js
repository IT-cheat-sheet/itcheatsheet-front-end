import axios from "axios";

const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;

export const getSubject = () => {
  return axios.get(`${host}${port}/subject/getall`);
};

export const getSemester = () => {
  return axios.get(`${host}${port}/semester/getall`);
};

export const getTopic = () => {
  return axios.get(`${host}${port}/topic/getAll`);
}

export const getReview = (page, pageSize, searchWord, filter) => {
  return axios.get(`${host}${port}/review/getAll?page=${page - 1}&pageSize=${pageSize}&searchWord=${searchWord}&sortTopic=${filter}&sortDesc=true`);
};

export const getSheet = (page, pageSize, searchWord, filter) => {
  return axios.get(`${host}${port}/summarypost/getAll?pageNumber=${page}&pageSize=${pageSize}&search=${searchWord}&semesterFilter=${filter}&sortType=DESC`);
};

export const getReport = (filter, searchWord, readPage, token) => {
  return axios.get(`${host}${port}/report/getAll?sortBy=${filter}&search=${searchWord}&readStatus=${readPage ? 1 : 0}`,
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export const getReviewImage = (id) => {
  return axios.get(`${host}${port}/review/image/${id}`,
  {
    responseType: "blob"
  });
}

export const getSpecificSheet = (id) => {
  return axios.get(`${host}${port}/summarypost/get/${id}`);
}

export const getSpecificPdf = (id) => {
  return axios.get(`${host}${port}/summarypost/getFile/${id}`,{
    responseType: 'blob'
  })
}

export const getSpecificReview = (id) => {
  return axios.get(`${host}${port}/review/get/${id}`);
}

export const getRecommendedReviews = () => {
  return axios.get(`${host}${port}/review/random`);
}

export const getSuggestedSheet = (sem) => {
  return axios.get(`${host}${port}/summarypost/hotSheet/${sem}`);
}

export const getSuggestedReview = (rand) => {
  return axios.get(`${host}${port}/review/hotReview/${rand}`);
}