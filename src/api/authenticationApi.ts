import axios from 'axios';
import type { RegisterUser } from '@/types/authentication.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export async function registerUserApi(registerUserData: RegisterUser) {
  return axios.post<{ message: string }>(`${PREFIX_URL}/register`, registerUserData);
}

export async function loginUserApi(loginUserFormData: FormData) {
  return axios.post<{ access_token: string }>(`${PREFIX_URL}/login`, loginUserFormData);
}
