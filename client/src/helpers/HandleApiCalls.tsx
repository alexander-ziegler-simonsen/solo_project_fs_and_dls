import axios from 'axios';
import { Item } from '../domain/Item';

const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;


export async function newGetData<T>(gateway: string): Promise<T> {
  const url = `http://${API_HOST}:${API_PORT}/${gateway}`;
  console.log('dev - url to api', url);

  try {
    // Expect the server to return the JSON body matching T directly
    const response = await axios.get<T>(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('newGetData response', response);
    // console.log('newGetData data', response.data);

    // Return the parsed response body
    return response.data;
  } catch (error) {
    console.error('newGetData error:', error);
    throw error;
  }
}

// Simple list fetcher: returns the 'data' array from server response
export async function getDataList<T>(gateway: string): Promise<T[]> {
  const url = `http://${API_HOST}:${API_PORT}/${gateway}`;
  console.log('dev - url to api', url);

  try {
    const response = await axios.get<{ data: T[] }>(url, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('getDataList response', response);
    // console.log('getDataList data', response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('getDataList error:', error);
    throw error;
  }
}


export async function getData<T>(gateway:string) {
  // this is for host on VPS
  
  const url = `http://${API_HOST}:${API_PORT}/${gateway}`; 
  console.log("dev - url to api", url);
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

    // console.log("getData",response);
    // console.log("getData",response.data);
    // console.log("getData",response.data.data);


    return response.data.data as T[];
  } catch (error) {
    console.error("getData error:", error);
    throw error; // optional: rethrow for error handling in caller
  }
}

export async function PostOneData<T>(gateway:string, insertData:T) {
  const url = `${API_HOST}:${API_PORT}/${gateway}`;  
  console.log("dev - url to api", url);


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
  const url = `${API_HOST}:${API_PORT}/${gateway}`;  
  console.log("dev - url to api", url);

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
  const url = `${API_HOST}:${API_PORT}/login`; 
  console.log("dev - url to api", url);

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
