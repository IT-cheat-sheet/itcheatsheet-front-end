import axios from "axios";

const host = process.env.REACT_APP_BE_HOST;

export const setReadStatus = (id, token) => {
  return axios.put(`${host}/report/setReadStatus/${id}`,
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