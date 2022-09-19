import { baseUrl, options } from "../constant/api.url";
import axios from "axios";

const patientBaseUrl = baseUrl + "Patient";
let option = options
export const getAllData = async (accessToken: string) => {
  option.headers.Authorization = 'Bearer' + accessToken;
  return await axios.get(patientBaseUrl, option);
};

export const postData = async (jsonPostBody: {}, accessToken: string) => {
  option.headers.Authorization = `Bearer ${accessToken}`
  let response = await axios.post(patientBaseUrl, jsonPostBody, option);

  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const getDataById = async (id: string, accessToken: string) => {
  let url = patientBaseUrl + `/${id}`;
  option.headers.Authorization = `Bearer ${accessToken}`
  return await axios.get(url, option);
};

export const updateData = async (jsonPostBody: any, accessToken: string) => {
  option.headers.Authorization = `Bearer ${accessToken}`
  let url = patientBaseUrl //+ `/${jsonPostBody['id']}`;
  let response = await axios.put(url, jsonPostBody, option);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const deletePatient = async (id: string, accessToken: string) => {
  let url = patientBaseUrl + `/${id}`;
  option.headers.Authorization = `Bearer ${accessToken}`
  let response = await axios.delete(url, option);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const getPatientDetails = async (inputParams: any, accessToken: String) => {
  let url = patientBaseUrl + `?PatientName=${inputParams.name}&PatientMRN=${inputParams.mrn}&PatientGender=${inputParams.gender}&PatientId=${inputParams.id}`
  option.headers.Authorization = `Bearer ${accessToken}`
  let response = await axios.get(url, option);
  return response;
}
