import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Types
export interface Property {
  property_id: string;
  Societyname: string;
  floor: string;
  bedrooms: string;
  area: string;
  areaunits: string;
  buildingfloors: string;
  address: string;
  amenities: string[];
  facing: string;
  propertyage: string;
  balconies: string;
  bathrooms: string;
  price: string;
  postedby: string;
  type: string;
  constructionstatus: string;
  furnishing: string;
  highlights: string[];
  location: string;
  line: string;
  images: string[];
  for: string;
  active: boolean;
  postedby_id?: string;
  postedbytype?: string;
}

// API Functions
const fetchProperties = async (): Promise<Property[]> => {
  const { data } = await axiosInstance.get('/api/getproperties');
  return data.payload;
};

const fetchSpecificProperty = async (propertyId: string): Promise<Property> => {
  const { data } = await axiosInstance.get('/api/getspecificproperty', {
    params: { property_id: propertyId },
  });
  return data.payload[0];
};

const fetchOwnerProperties = async (userEmail: string): Promise<Property[]> => {
  const { data } = await axiosInstance.get('/api/getownerproperties', {
    params: { user: userEmail },
  });
  return data.payload;
};

const fetchBrokerProperties = async (brokerId: string): Promise<Property[]> => {
  const { data } = await axiosInstance.get('/api/getbrokerproperties', {
    params: { id: brokerId },
  });
  return data.payload;
};

const addProperty = async (propertyData: FormData): Promise<any> => {
  const { data } = await axiosInstance.post('/api/addproperties', propertyData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const updateProperty = async (propertyData: FormData): Promise<any> => {
  const { data } = await axiosInstance.post('/api/updateproperty', propertyData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

const deleteProperty = async (propertyId: string): Promise<any> => {
  const { data } = await axiosInstance.post('/api/deleteproperty', {
    property_id: propertyId,
  });
  return data;
};

// Hooks
export const useGetProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetSpecificProperty = (propertyId: string) => {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchSpecificProperty(propertyId),
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetOwnerProperties = (userEmail: string) => {
  return useQuery({
    queryKey: ['ownerProperties', userEmail],
    queryFn: () => fetchOwnerProperties(userEmail),
    enabled: !!userEmail,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetBrokerProperties = (brokerId: string) => {
  return useQuery({
    queryKey: ['brokerProperties', brokerId],
    queryFn: () => fetchBrokerProperties(brokerId),
    enabled: !!brokerId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['ownerProperties'] });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProperty,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property'] });
      queryClient.invalidateQueries({ queryKey: ['ownerProperties'] });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['ownerProperties'] });
    },
  });
};
