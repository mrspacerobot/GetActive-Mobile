import { Activity } from '../types/activity.types';

// Replace with your actual API base URL
const API_BASE_URL = 'https://your-api-endpoint.com/api';

// Activity data type for creating a new activity
export interface CreateActivityData {
  title: string;
  description?: string;
  activityType: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  latitude: number;
  longitude: number;
}

// Configuration for API requests
interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Generic function to handle API requests
 */
const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add authorization if you have a token
  // if (authToken) {
  //   defaultHeaders['Authorization'] = `Bearer ${authToken}`;
  // }

  const config: RequestOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }
    
    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json() as T;
    }
    
    return await response.text() as unknown as T;
  } catch (error) {
    console.error(`API request error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Service for managing activities
 */
export const ActivityService = {
  // Get all activities
  getAll: async (): Promise<Activity[]> => {
    return request<Activity[]>('/activities');
  },
  
  // Get activity by ID
  getById: async (id: string): Promise<Activity> => {
    return request<Activity>(`/activities/${id}`);
  },
  
  // Create new activity
  create: async (activityData: CreateActivityData): Promise<Activity> => {
    return request<Activity>('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  },
  
  // Update activity
  update: async (id: string, activityData: Partial<CreateActivityData>): Promise<Activity> => {
    return request<Activity>(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activityData),
    });
  },
  
  // Delete activity
  delete: async (id: string): Promise<void> => {
    return request<void>(`/activities/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Join an activity
  join: async (activityId: string): Promise<Activity> => {
    return request<Activity>(`/activities/${activityId}/join`, {
      method: 'POST',
    });
  },
  
  // Leave an activity
  leave: async (activityId: string): Promise<Activity> => {
    return request<Activity>(`/activities/${activityId}/leave`, {
      method: 'POST',
    });
  },
};

export default ActivityService;