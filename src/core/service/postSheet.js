import axios from "axios";

const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;

export const postSheet = (
  semesterNumber,
  subjectNumber,
  summaryTitle,
  summaryContent,
  posterName,
  linkAttachment
) => {
  return axios.post(`h${host}${port}/summarypost/create`, {
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
  axios.post(`${host}${port}/review/add`, {
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

  return axios.post(`${host}${port}/summaryPost/upload/${id}`, fd,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const postReport = (page, id, action, desc) => {
  return axios.post(`${host}${port}/report/add`, JSON.stringify(page === 'sheet' ? {
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
  return axios.post(`${host}${port}/admin/login`, JSON.stringify({
    "username": `${username}`,
    "password": `${password}`
  }),
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}