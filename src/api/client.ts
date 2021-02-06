import axios, {AxiosError, AxiosResponse} from 'axios';

import {ResponseData, ResponseError} from './types';

export const API_URI = process.env.REACT_APP_API_URI;
const API_KEY = process.env.REACT_APP_API_KEY;

export const client = axios.create({
  baseURL: API_URI,
});

/**
 *
 * @param token access token or empty to delete
 */

export const setClientAuthorizationHeader = (token?: string) => {
  if (token) {
    client.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.Authorization;
  }
};

client.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  if (
    error.response.status === 401 &&
    !originalRequest._retry &&
    originalRequest.url !== '/auth'
  ) {
    if (!API_KEY) {
      console.error('API_KEY has not been provided');
      return;
    }
    originalRequest._retry = true;
    console.log('Getting token...');

    const {data} = await getToken({apiKey: API_KEY});

    if (data) {
      setClientAuthorizationHeader(data.token);
      originalRequest.headers.Authorization = `Bearer ${data.token}`;
      console.log('Retry request with token provided...');
      return client(originalRequest);
    }
  }

  return Promise.reject(error);
});

export const makeFetcher = <ResponseType, RequestType = undefined>(
  url: string | ((data: string | number) => string),
  method?: 'post' | 'get',
) => async (data?: RequestType): Promise<ResponseData<ResponseType>> => {
  try {
    const response = await client.request<
      RequestType,
      AxiosResponse<ResponseType>
    >({
      url:
        typeof url === 'function'
          ? url(
              typeof data === 'string' || typeof data === 'number' ? data : '',
            )
          : url,
      method,
      data: typeof url === 'function' ? undefined : data,
    });
    return {data: response.data};
  } catch (error) {
    const axiosError = error as AxiosError<ResponseError>;
    if (axiosError.response?.status === 401) {
      console.error('Got 401');
      // after interception we're still getting 401
      // hence API_KEY is not valid
      setClientAuthorizationHeader();
    }
    return {
      error: axiosError.response?.data || {
        message: error.toString(),
      },
    };
  }
};

interface GetTokenResponse {
  token: string;
}

interface GetTokenRequest {
  apiKey: string;
}

const getToken = makeFetcher<GetTokenResponse, GetTokenRequest>(
  '/auth',
  'post',
);
