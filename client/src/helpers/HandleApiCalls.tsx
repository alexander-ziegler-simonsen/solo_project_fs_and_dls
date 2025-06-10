import axios from 'axios';
// import 'dotenv/config';
//import { configDotenv } from "dotenv";

//configDotenv();

// const test1 = process.env.API_HOST;
const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;
const axiosConfig = {
  "headers": {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Expose-Headers": "X-Custom-Header",
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
  },
}

export async function getData<T>(gateway:string) {
  //await axios.get<T[]>(`${API_HOST}:${API_PORT}/${gateway}`)
  const url = `http://localhost:3003/${gateway}`;

  //axios.get<T[]>(url, axiosConfig)

  await axios({
    method: 'get',
    url: url,
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
  }
  })
  .then(function (response) {
    console.log("debug", response);
    console.log("debug", response.data);

    return response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}