import { baseUrl, options } from "../constant/api.url";
import axios from "axios";

const patientBaseUrl = baseUrl + "Patient";

export const getAllData = async () => {
  return await axios.get(patientBaseUrl, options);
};

export const postData = async (jsonPostBody: {}) => {
  let response = await axios.post(patientBaseUrl, jsonPostBody);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const getDataById = async (id: string) => {
  let url = patientBaseUrl + `/${id}`;
  return await axios.get(url, options);
};

export const updateData = async (jsonPostBody: any) => {
  let url = patientBaseUrl + `/${jsonPostBody['id']}`;
  let response = await axios.put(url, options);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};
