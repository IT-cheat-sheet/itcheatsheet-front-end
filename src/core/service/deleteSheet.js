import axios from "axios";

export const deleteSheet = (id, token) => {
  return axios.delete(`http://localhost:3000/summarypost/delete/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const deleteReview = (id, token) => {
  return axios.delete(`http://localhost:3000/review/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}