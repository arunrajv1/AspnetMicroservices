import { baseUrl, options } from "../constant/api.url";
import axios from "axios";

const patientBaseUrl = baseUrl + "Patient";

export const getAllData = async () => {
  return await axios.get(patientBaseUrl, options).then(response => response);
};

export const postData = async (jsonPostBody: {}) => {
  let response = await axios.post(patientBaseUrl, jsonPostBody);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};