import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_APP_URI;

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  usertype: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  usertype: string;
}

export interface AdminLoginData {
  email: string;
  password: string;
}

// API Functions
const login = async (credentials: { payload: string }): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });
  return data;
};

const register = async (userData: { payload: RegisterData }): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/Registeruser`, userData, {
    withCredentials: true,
  });
  return data;
};

const adminLogin = async (credentials: { payload: string }): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/adminlogin`, credentials);
  return data;
};

const sendLoginOtp = async (payload: { email: string; usertype: string }): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/sendloginotp`, payload);
  return data;
};

const sendResetOtp = async (payload: { email: string }): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/admin/send-reset-otp`, payload);
  return data;
};

const verifyReset = async (payload: {
  email: string;
  otp: string;
  newPassword: string;
}): Promise<any> => {
  const { data } = await axios.post(`${API_URL}/admin/verify-reset`, payload);
  return data;
};

// Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

export const useSendLoginOtp = () => {
  return useMutation({
    mutationFn: sendLoginOtp,
  });
};

export const useSendResetOtp = () => {
  return useMutation({
    mutationFn: sendResetOtp,
  });
};

export const useVerifyReset = () => {
  return useMutation({
    mutationFn: verifyReset,
  });
};
