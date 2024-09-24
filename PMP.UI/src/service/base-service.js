import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080"
})

API.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['Authorization'] = `Bearer asdasdasdasd`;
  let token = sessionStorage.getItem("access_token");
  if (!token)
    return config;
  let access_token = JSON.parse(token).access_token
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

API.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    //window.location.href = '/403';
    alert(error.message)
  });
export default API;

