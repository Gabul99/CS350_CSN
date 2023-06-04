import Axios from "axios";
import qs from "qs";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

let showNotLoginAlertFlag = true;
export const getForEntity: <T>(url: string, params: any, arrayNoBrackets?: boolean) => Promise<T> = (
  url: string,
  params: any,
  arrayNoBrackets?: boolean
) => {
  return requestForEntity(HttpMethod.GET, url, params, null, arrayNoBrackets);
};

export const deleteForEntity: <T>(url: string, params: any, arrayNoBrackets?: boolean) => Promise<T> = (
  url: string,
  params: any,
  arrayNoBrackets?: boolean
) => {
  return requestForEntity(HttpMethod.DELETE, url, params, null, arrayNoBrackets);
};

export const postForEntity: <T>(url: string, data: any) => Promise<T> = (url: string, data: any) => {
  return requestForEntity(HttpMethod.POST, url, null, data);
};

export const putForEntity: <T>(url: string, data: any) => Promise<T> = (url: string, data: any) => {
  return requestForEntity(HttpMethod.PUT, url, null, data);
};

export const patchForEntity: <T>(url: string, data: any) => Promise<T> = (url: string, data: any) => {
  return requestForEntity(HttpMethod.PATCH, url, null, data);
};

let testToken = "";

const requestForEntity: <T>(
  method: HttpMethod,
  url: string,
  params: any | null,
  data: any | null,
  arrayNoBrackets?: boolean
) => Promise<T> = async (
  method: HttpMethod,
  url: string,
  params: any | null,
  data: any | null,
  arrayNoBrackets?: boolean
) => {

    try {
      let headers;
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        const token = await axios.get("http://localhost:3000/auth/test");
        testToken = token.data.accessToken;
        headers = {
          Authorization: `Bearer ${testToken}`
        };
      } else {
        headers = {
          Authorization: `Bearer ${accessToken}`
        };
      }


      const axiosResult = await Axios.request({
        url,
        method,
        params,
        data,
        headers,
        baseURL: "http://localhost:3000/"
        // paramsSerializer: arrayNoBrackets ? params => qs.stringify(params, { arrayFormat: 'repeat' }) : undefined,
      });
      return axiosResult.data;
    } catch (e) {
      // 401 일 시 token refresh 필요
      throw e;
    }
  };
