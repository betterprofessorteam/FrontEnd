import axios from "axios";
import { baseURL } from "../store/constants";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: baseURL
  });
};
