import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const timeMs = process.hrtime()[0] * 1000;
  config.headers!["req-start"] = timeMs;
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    const timeMs = process.hrtime()[0] * 1000;
    const reqStartMs: number = response.config.headers["req-start"];

    response.headers["req-duration"] = timeMs - reqStartMs;
    return response;
  },
  (response: any) => {
    const timeMs = process.hrtime()[0] * 1000;
    const reqStartMs: number = response.config.headers["req-start"];

    response.headers["req-duration"] = timeMs - reqStartMs;
    return response;
  }
);

export { axiosInstance };
