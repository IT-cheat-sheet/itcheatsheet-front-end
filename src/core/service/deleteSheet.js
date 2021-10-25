import axios from "axios";

export const deleteSheet = (id, token) => {
  return axios.delete(`/summarypost/delete/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}