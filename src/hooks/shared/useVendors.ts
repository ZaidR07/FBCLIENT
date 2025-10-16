import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Types
export interface Vendor {
  vendor_id: string;
  vendorname: string;
  companyname: string;
  emailid: string;
  mobile1: string;
  mobile2: string;
  address: string;
  servicetype: string;
  location?: string;
  pincode?: string;
}

// API Functions
const fetchVendors = async (): Promise<Vendor[]> => {
  const { data } = await axiosInstance.get('/api/getvendors');
  return data.payload;
};

const addVendor = async (vendorData: FormData): Promise<any> => {
  const { data } = await axiosInstance.post('/api/addvendor', vendorData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const updateVendor = async (vendorData: any): Promise<any> => {
  const { data } = await axiosInstance.post('/api/updatevendor', vendorData);
  return data;
};

const deleteVendor = async (vendorId: string): Promise<any> => {
  const { data } = await axiosInstance.post('/api/deletevendor', { id: vendorId });
  return data;
};

// Hooks
export const useGetVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
    },
  });
};
