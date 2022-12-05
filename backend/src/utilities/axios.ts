import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  //const timeMs = process.hrtime()[0] * 1000;
  const now = Date.now();
  config.headers!["req-start"] = now;
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    // const timeMs = process.hrtime()[0] * 1000;
    const now = Date.now();
    const startTime: number = response.config.headers["req-start"];

    response.headers["req-duration"] = now - startTime;
    return response;
  },
  (response: any) => {
    const now = Date.now();
    const startTime: number = response.config.headers["req-start"];

    response.headers["req-duration"] = now - startTime;
    return response;
  }
);

export { axiosInstance };
