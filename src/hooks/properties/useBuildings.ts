import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_APP_URI;

// API Functions
const fetchBuildings = async (location: string): Promise<string[]> => {
  const { data } = await axios.get(`${API_URL}/getbuildings`, {
    params: { location },
  });
  return data.payload;
};

// Hook
export const useGetBuildings = (location: string) => {
  return useQuery({
    queryKey: ['buildings', location],
    queryFn: () => fetchBuildings(location),
    enabled: !!location && location.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
