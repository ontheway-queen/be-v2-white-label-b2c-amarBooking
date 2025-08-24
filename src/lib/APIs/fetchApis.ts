import { auth } from '@/auth';
import { baseURL } from '@/request';
import { SITE_INFO } from '@/site-config';
import { HTTPResponse } from '@/type/type';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchRequest = async <T>(
  url: string,
  options: FetchOptions = {},
  delayMs: number = 0,
): Promise<HTTPResponse<T>> => {
  const session = await auth();
  const token = session?.user.backendToken;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token ? token : ''}`,
    token: SITE_INFO.token,
    ...options.headers,
  };

  const config: FetchOptions = {
    ...options,
    headers,
    credentials: 'include',
  };

  if (delayMs > 0) {
    await delay(delayMs);
  }

  const response = await fetch(`${baseURL}/${url}`, config);

  // console.log('🚀 API REQUEST:', `${baseURL}/${url}`, config);
  // console.log('✅ API RESPONSE RECEIVED:', response.status, response.url);

  if (!response.ok) {
    const err = await response.text();
    const error = new Error(err);

    throw error;
  }

  const data: HTTPResponse<T> = await response.json();

  return data;
};
