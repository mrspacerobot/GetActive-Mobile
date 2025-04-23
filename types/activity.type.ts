// Define all your activity-related types

export interface Activity {
    id: string;
    title: string;
    subtitle: string;
    location: string;
    date: string;
    description: string;
    enabled: boolean;
  }
  
  export interface ActivityFilter {
    category?: string;
    date?: string;
    searchQuery?: string;
  }
  
  export interface ActivityState {
    activities: Activity[];
    filteredActivities: Activity[];
    isLoading: boolean;
    searchQuery: string;
    selectedFilter: string;
    error: string | null;
  }
  
  export interface ActivityStore extends ActivityState {
    // Actions
    fetchActivities: () => Promise<void>;
    setSearchQuery: (query: string) => void;
    setSelectedFilter: (filter: string) => void;
    filterActivities: () => void;
    toggleActivityEnabled: (id: string) => void;
  }