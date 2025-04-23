import { Activity } from '../types/activity.types';

// Replace with your actual API base URL
const API_BASE_URL = 'https://your-api-endpoint.com/api';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface SearchParams {
  q?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | undefined;
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
 * API methods for activities
 */
export const ActivitiesAPI = {
  // Get all activities
  getAll: (params: Record<string, string> = {}): Promise<Activity[]> => {
    // Convert params object to URL query string
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    return request<Activity[]>(`/activities${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get activity by ID
  getById: (id: string): Promise<Activity> => {
    return request<Activity>(`/activities/${id}`);
  },
  
  // Create new activity
  create: (activityData: Omit<Activity, 'id'>): Promise<Activity> => {
    return request<Activity>('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  },
  
  // Update activity
  update: (id: string, activityData: Partial<Activity>): Promise<Activity> => {
    return request<Activity>(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activityData),
    });
  },
  
  // Delete activity
  delete: (id: string): Promise<void> => {
    return request<void>(`/activities/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Search activities with filters
  search: (searchQuery: string, filters: SearchParams = {}): Promise<Activity[]> => {
    const params: SearchParams = { 
      q: searchQuery,
      ...filters
    };
    
    const queryString = Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== '')
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`)
      .join('&');
    
    return request<Activity[]>(`/activities/search${queryString ? `?${queryString}` : ''}`);
  }
};

export default {
  ActivitiesAPI,
};