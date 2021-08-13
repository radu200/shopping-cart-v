import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://vitl-static-api.s3-eu-west-1.amazonaws.com",
});

export const api = {
  get(url: string) {
    return axiosInstance.get(url);
  },
};
