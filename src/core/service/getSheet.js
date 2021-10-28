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

export const getSheet = (page, pageSize, searchWord, filter) => {
  return axios.get(`http://localhost:3000/summarypost/getAll?pageNumber=${page}&pageSize=${pageSize}&search=${searchWord}&semesterFilter=${filter}&sortType=DESC`);
};

export const getReport = (filter, searchWord, readPage, token) => {
  return axios.get(`http://localhost:3000/report/getAll?sortBy=${filter}&search=${searchWord}&readStatus=${readPage ? 1 : 0}`,
  {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};

export const getReviewImage = (id) => {
  return axios.get(`http://localhost:3000/review/image/${id}`,
  {
    responseType: "blob"
  });
}

export const getSpecificSheet = (id) => {
  return axios.get(`http://localhost:3000/summarypost/get/${id}`);
}

export const getSpecificPdf = (id) => {
  return axios.get(`http://localhost:3000/summarypost/getFile/${id}`,{
    responseType: 'blob'
  })
}

export const getSpecificReview = (id) => {
  return axios.get(`http://localhost:3000/review/get/${id}`);
}

export const getRecommendedReviews = () => {
  return axios.get("http://localhost:3000/review/random");
}