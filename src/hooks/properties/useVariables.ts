import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_APP_URI;

// Types
export interface Variables {
  bhklist: string[];
  propertytypelist: Array<{ name: string; category: number }>;
  furnishingstatuslist: string[];
  amenitieslist: string[];
  constructionstatuslist: string[];
  linelist: string[];
  locationlist: string[];
  postedbylist?: string[];
  purchasetypelist?: string[];
}

// API Functions
const fetchVariables = async (): Promise<Variables> => {
  const { data } = await axios.get(`${API_URL}/getvariables`);
  return data.payload;
};

const fetchSpecificVariable = async (category: string): Promise<string[]> => {
  const { data } = await axios.get(`${API_URL}/getspecificvariable`, {
    params: { category },
  });
  return data.payload;
};

// Hooks
export const useGetVariables = () => {
  return useQuery({
    queryKey: ['variables'],
    queryFn: fetchVariables,
    staleTime: 10 * 60 * 1000, // 10 minutes - variables don't change often
  });
};

export const useGetSpecificVariable = (category: string) => {
  return useQuery({
    queryKey: ['variable', category],
    queryFn: () => fetchSpecificVariable(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000,
  });
};
