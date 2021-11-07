import axios from "axios";

const host = process.env.REACT_APP_BE_HOST;

export const deleteSheet = (id, token) => {
  return axios.delete(`${host}/summarypost/delete/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const deleteReview = (id, token) => {
  return axios.delete(`${host}/review/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}