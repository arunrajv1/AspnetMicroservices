import { baseUrl, options } from "../constant/api.url";
import axios from "axios";

const getAllSuperHeroUrl = baseUrl + "GetAllSuperHeroes";

export const getAllData = async () => {
  // let response = await axios.get(getAllSuperHeroUrl, options);
  // return response;
  return await axios.get(getAllSuperHeroUrl, options).then(response => response);
};

export const postData = async (jsonPostBody: {}) => {
  let url = baseUrl + "SaveSuperHeroDetails";
  let response = await axios.post(url, jsonPostBody);
  //let responseOK = response && response.status === 200 && response.data;

  return response;
};

export const deleteDataById = async (id: number) => {
  let url = baseUrl + `DeleteSuperHeroById?id=${id}`;
  let response = await axios.delete(url, options);
  console.log('delete response', response);
  return response;
};
