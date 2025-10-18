import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

// Types
export interface Feedback {
  feedback_id: number;
  name: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface FeedbackFormData {
  name: string;
  rating: number;
  message: string;
}

// API Functions
const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const { data } = await axiosInstance.get('/api/getfeedbacks');
  return data.payload;
};

const addFeedback = async (feedbackData: FeedbackFormData): Promise<any> => {
  const { data } = await axiosInstance.post('/api/addfeedback', feedbackData);
  return data;
};

// Custom Hooks
export const useFeedbacks = () => {
  return useQuery({
    queryKey: ['feedbacks'],
    queryFn: fetchFeedbacks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAddFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      // Invalidate and refetch feedbacks after successful submission
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
    },
  });
};
