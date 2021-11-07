import axios from "axios";

const host = process.env.REACT_APP_BE_HOST;

export const getSubject = () => {
  return axios.get(`${host}/subject/getall`);
};

export const getSemester = () => {
  return axios.get(`${host}/semester/getall`);
};

export const getTopic = () => {
  return axios.get(`${host}/topic/getAll`);
}

export const getReview = (page, pageSize, searchWord, filter) => {
  return axios.get(`${host}/review/getAll?page=${page - 1}&pageSize=${pageSize}&searchWord=${searchWord}&sortTopic=${filter}&sortDesc=true`);
};

export const getSheet = (page, pageSize, searchWord, filter) => {
  return axios.get(`${host}/summarypost/getAll?pageNumber=${page}&pageSize=${pageSize}&search=${searchWord}&semesterFilter=${filter}&sortType=DESC`);
};

export const getReport = (filter, searchWord, readPage, token) => {
  return axios.get(`${host}/report/getAll?sortBy=${filter}&search=${searchWord}&readStatus=${readPage ? 1 : 0}`,
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export const getReviewImage = (id) => {
  return axios.get(`${host}/review/image/${id}`,
  {
    responseType: "blob"
  });
}

export const getSpecificSheet = (id) => {
  return axios.get(`${host}/summarypost/get/${id}`);
}

export const getSpecificPdf = (id) => {
  return axios.get(`${host}/summarypost/getFile/${id}`,{
    responseType: 'blob'
  })
}

export const getSpecificReview = (id) => {
  return axios.get(`${host}/review/get/${id}`);
}

export const getRecommendedReviews = () => {
  return axios.get(`${host}/review/random`);
}

export const getSuggestedSheet = (sem) => {
  return axios.get(`${host}/summarypost/hotSheet/${sem}`);
}

export const getSuggestedReview = (rand) => {
  return axios.get(`${host}/review/hotReview/${rand}`);
}