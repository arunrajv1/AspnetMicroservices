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
  let response = await axios.put(url, jsonPostBody);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const deletePatient = async (id: string) => {
  let url = patientBaseUrl + `/${id}`;
  let response = await axios.delete(url, options);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const getPatientDetails = async (params: any) => {
  let url = patientBaseUrl;
  if (params.name) {
    url = url + `/${params.name}`
  }
  if (params.mrn) {
    url = url + `/${params.mrn}`
  }
  if (params.gender) {
    url = url + `/${params.gender}`
  }
  if (params.id) {
    url = url + `/${params.id}`
  }
  console.log('api url', url);
}
