import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Types
export interface Broker {
  broker_id: string;
  brokername: string;
  companyname: string;
  emailid: string;
  mobile1: string;
  mobile2: string;
  address: string;
  image?: string;
  location?: string;
  pincode?: string;
  credits?: {
    credits: number;
    validity: Date;
  };
}

export interface BrokerFormData {
  broker_id?: string;
  brokername: string;
  companyname: string;
  emailid: string;
  mobile1: string;
  mobile2: string;
  address: string;
  image?: File | string;
}

// API Functions
const fetchBrokers = async (): Promise<Broker[]> => {
  const { data } = await axiosInstance.get('/api/getbrokers');
  return data.payload;
};

const addBroker = async (brokerData: FormData): Promise<any> => {
  const { data } = await axiosInstance.post('/api/addbroker', brokerData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const updateBroker = async (brokerData: { formdata: BrokerFormData }): Promise<any> => {
  const { data } = await axiosInstance.post('/api/updatebroker', brokerData);
  return data;
};

const deleteBroker = async (brokerId: string): Promise<any> => {
  const { data } = await axiosInstance.post('/api/deletebroker', { id: brokerId });
  return data;
};

const updateBrokerCredits = async (payload: {
  broker_id: string;
  credits: number;
  validity: string;
}): Promise<any> => {
  const { data } = await axiosInstance.post('/api/updatebrokercredits', payload);
  return data;
};

// Hooks
export const useGetBrokers = () => {
  return useQuery({
    queryKey: ['brokers'],
    queryFn: fetchBrokers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAddBroker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addBroker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
    },
  });
};

export const useUpdateBroker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBroker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
    },
  });
};

export const useDeleteBroker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBroker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
    },
  });
};

export const useUpdateBrokerCredits = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateBrokerCredits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokers'] });
    },
  });
};
