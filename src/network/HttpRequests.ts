import Axios from 'axios';
import qs from 'qs';

enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

let showNotLoginAlertFlag = true;
export const getForEntity: <T>(url: string, params: any, arrayNoBrackets?: boolean) => Promise<T> = (
  url: string,
  params: any,
  arrayNoBrackets?: boolean,
) => {
  return requestForEntity(HttpMethod.GET, url, params, null, arrayNoBrackets);
};

export const deleteForEntity: <T>(url: string, params: any, arrayNoBrackets?: boolean) => Promise<T> = (
  url: string,
  params: any,
  arrayNoBrackets?: boolean,
) => {
  return requestForEntity(HttpMethod.DELETE, url, params, null, arrayNoBrackets);
};

export const postForEntity: <T>(url: string, data: any) => Promise<T> = (url: string, data: any) => {
  return requestForEntity(HttpMethod.POST, url, null, data);
};

export const putForEntity: <T>(url: string, data: any) => Promise<T> = (url: string, data: any) => {
  return requestForEntity(HttpMethod.PUT, url, null, data);
};

const requestForEntity: <T>(
  method: HttpMethod,
  url: string,
  params: any | null,
  data: any | null,
  arrayNoBrackets?: boolean,
) => Promise<T> = async (
  method: HttpMethod,
  url: string,
  params: any | null,
  data: any | null,
  arrayNoBrackets?: boolean,
) => {
  // const idToken = await firebase.auth().currentUser?.getIdToken();
  // if (!idToken) {
  //   if (showNotLoginAlertFlag) {
  //     showNotLoginAlertFlag = false;
  //     alert('로그인 후 이용해주세요!');
  //   }
  //   throw new Error('userNotSignInError');
  // }
  // const headers = {
  //   Authorization: idToken,
  // };

  try {
    const axiosResult = await Axios.request({
      url,
      method,
      params,
      data,
      // headers,
      // baseURL: process.env.SERVER_URL,
      // paramsSerializer: arrayNoBrackets ? params => qs.stringify(params, { arrayFormat: 'repeat' }) : undefined,
    });
    return axiosResult.data;
  } catch (e) {
    throw e;
  }
};
