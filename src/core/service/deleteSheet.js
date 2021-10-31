import axios from "axios";

const endOfHost = window.location.origin.lastIndexOf(':') <= 5 ? window.location.origin.length : window.location.origin.lastIndexOf(':');
const host = process.env.REACT_APP_BE_HOST === 'CLIENT' ? window.location.origin.slice(0, endOfHost) : process.env.REACT_APP_BE_HOST;
const port = process.env.REACT_APP_BE_PORT === 'CLIENT' ? (endOfHost !== window.location.origin.length ? ":" + window.location.origin.slice(endOfHost + 1, window.location.origin.length) : "" ) : ":" + process.env.REACT_APP_BE_PORT;

export const deleteSheet = (id, token) => {
  return axios.delete(`${host}${port}/summarypost/delete/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const deleteReview = (id, token) => {
  return axios.delete(`${host}${port}/review/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}