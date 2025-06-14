import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

export async function getData<T>(gateway:string) {
  const url = `${API_HOST}:${API_PORT}/${gateway}`;

  await axios({
    method: 'get',
    url: url,
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
  }
  })
  .then(function (response) {
    console.log("debug", response);
    console.log("debug", response.data);

    // TODO - check if the data is the same as T
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

export async function PostOneData<T>(gateway:string, insertData:T) {
  const url = `${API_HOST}:${API_PORT}/${gateway}`;

  await axios({
    method: 'post',
    url: url,
    withCredentials: true,
    data: insertData,
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

export async function PostManyData<T>(gateway:string, insertData:T[]) {
  const url = `${API_HOST}:${API_PORT}/${gateway}`;

  await axios({
    method: 'post',
    url: url,
    withCredentials: true,
    data: insertData,
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
    console.log(error);
  })
  .finally(function () {

  });
}