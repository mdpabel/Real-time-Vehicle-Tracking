import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3003/api/v1/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
});

export {axiosClient};
