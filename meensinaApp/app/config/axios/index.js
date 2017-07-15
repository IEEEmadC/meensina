import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://meensinapp.com/user-app/api',
  timeout: 6000
});

export default ax;
