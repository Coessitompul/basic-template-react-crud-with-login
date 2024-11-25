// import axios from "axios";
// import { useSelector } from "react-redux";

// const accessToken = () => {
//     const userSelector = useSelector((state) => state.users);

//     return userSelector.accessToken;
// }

// const instanceAdmin = axios.create({
//     baseURL: "http://localhost:3000/v1/api/admin",
//     withCredentials: true,
//     headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '. accessToken()
//     }
// });

// export default instanceAdmin;


import axios from "axios";
import store from "../store/store.js"; // Import your Redux store

const instanceAdmin = axios.create({
  baseURL: "http://localhost:3000/v1/api/admin",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to dynamically set the token
instanceAdmin.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Get the current Redux state
    const accessToken = state.users?.accessToken; // Access the token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceAdmin;



