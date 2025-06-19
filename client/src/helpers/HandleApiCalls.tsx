import axios from 'axios';

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

export async function getData<T>(gateway:string) {
  // this is for host on VPS
  const url = API_HOST=="localhost" ? `${API_HOST}:${API_PORT}/${gateway}` : `${API_HOST}/${gateway}`;

  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      },
    });

    // console.log("debug - getData", response);
    // console.log("debug - getData", response.data);

    return response.data.data as T[];
  } catch (error) {
    console.error("getData error:", error);
    throw error; // optional: rethrow for error handling in caller
  }
}

export async function PostOneData<T>(gateway:string, insertData:T) {
  const url = API_HOST=="localhost" ? `${API_HOST}:${API_PORT}/${gateway}` : `${API_HOST}/${gateway}`;

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
    // console.log("debug - PostOneData", response);
    // console.log("debug - PostOneData", response.data);

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
  const url = API_HOST=="localhost" ? `${API_HOST}:${API_PORT}/${gateway}` : `${API_HOST}/${gateway}`;

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
    // console.log("debug", response);
    // console.log("debug", response.data);

    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {

  });
}

export async function Login<T>(loginInfo:T) {
  const url = API_HOST=="localhost" ? `${API_HOST}:${API_PORT}/login` : `${API_HOST}/login`;

  await axios({
    method: 'post',
    url: url,
    withCredentials: true,
    data: loginInfo,
    headers: {
    'Content-Type': 'application/json',
  }
  })
  .then(function (response) {
    // console.log("debug - Login", response);
    // console.log("debug - Login", response.data);

    // TODO - add a lot of logic here

    console.log("DEBUG - login endpoint - client api handler", response.data);
    return response.data ;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}
