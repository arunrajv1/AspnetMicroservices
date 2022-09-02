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

export const getDataById = async (id: string,accessToken:string) => {
  let url = patientBaseUrl + `/${id}`;
  options.headers.Authorization='Bearer'+accessToken;
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

export const getPatientDetails = async (inputParams: any,accessToken:String) => {
  let url = patientBaseUrl + `?name=${inputParams.name}&mrn=${inputParams.mrn}&gender=${inputParams.gender}&id=${inputParams.id}`
  options.headers.Authorization=`Bearer ${accessToken}`
  let response = await axios.get(url, options);
  return response;
}
