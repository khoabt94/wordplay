import axios from "axios"

const API_URL = 'http://localhost:3000/api/v1'

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  }
})


// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // const accessToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN)
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error.response.data);
});

export default AxiosInstance
