import axios from 'axios';

// You can set your API base URL here
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/', // Change to your backend URL
  // You can add more config here if needed
});

const UseAxios = () => {
  return axiosSecure;
};

export default UseAxios;