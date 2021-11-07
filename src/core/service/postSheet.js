import axios from "axios";

const host = process.env.REACT_APP_BE_HOST;

export const postSheet = (
  semesterNumber,
  subjectNumber,
  summaryTitle,
  summaryContent,
  posterName,
  linkAttachment
) => {
  return axios.post(`${host}/summarypost/create`, {
    semesterNumber,
    subjectNumber,
    summaryTitle,
    summaryContent,
    posterName,
    linkAttachment,
  });
};

export const postThread = ({
  reviewTitle,
  reviewContent,
  reviewLink,
  reviewer,
  topicId,
}) => {
  axios.post(`${host}/review/add`, {
    reviewTitle,
    reviewContent,
    reviewLink,
    reviewer,
    topicId,
  });
};

export const postReview = (
  reviewTitle,
  reviewContent,
  reviewLink,
  reviewer,
  topicId
) => {
  return axios.post(`${host}/review/add`, {
    reviewTitle,
    reviewContent,
    reviewLink,
    reviewer,
    topicId,
  });
};

export const postPdf = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);

  return axios.post(`${host}/summaryPost/upload/${id}`, fd,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const postPic = (id, file) => {
  const fd = new FormData();
  fd.append('image', file);

  return axios.post(`${host}/review/file/upload/${id}`, fd,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const postReport = (page, id, action, desc) => {
  return axios.post(`${host}/report/add`, JSON.stringify(page === 'sheet' ? {
    summaryPostId: id,
    reportAction: action,
    reportDescription: desc,
    readStatus: 0
  } : {
    reviewId: id,
    reportAction: action,
    reportDescription: desc,
    readStatus: 0
  }),
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export const login = (username, password) => {
  return axios.post(`${host}/admin/login`, JSON.stringify({
    "username": `${username}`,
    "password": `${password}`
  }),
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}