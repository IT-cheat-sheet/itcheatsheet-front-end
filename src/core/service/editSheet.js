import axios from "axios";

export const setReadStatus = (id, token) => {
  return axios.put(`http://localhost:3000/report/setReadStatus/${id}`,
  {
    readStatus: 1
  },
  {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });
};