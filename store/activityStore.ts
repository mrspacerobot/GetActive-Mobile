import { create } from 'zustand';
import { Activity, ActivityStore } from '../types/activity.types';
import { ActivitiesAPI } from '../services/apiService';

// Create a typed store with Zustand (similar concept to Pinia)
const useActivityStore = create<ActivityStore>((set, get) => ({
  // State (similar to Pinia state)
  activities: [],
  filteredActivities: [],
  isLoading: false,
  searchQuery: '',
  selectedFilter: 'All',
  error: null,
  
  // Actions (similar to Pinia actions)
  fetchActivities: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Replace with your actual API call when ready
      // const data = await ActivitiesAPI.getAll();
      
      // Using mock data for now
      const mockData: Activity[] = [
        {
          id: '1',
          title: 'Skitour',
          subtitle: 'Dani',
          location: 'Skitour in Bernese Alps',
          date: 'Sat 10.1.2025',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          enabled: true
        },
        {
          id: '2',
          title: 'Skitour',
          subtitle: 'Dani',
          location: 'Skitour in Bernese Alps',
          date: 'Sat 10.1.2025', 
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          enabled: true
        },
        {
          id: '3',
          title: 'Hiking',
          subtitle: 'Sarah',
          location: 'Hiking in Jura Mountains',
          date: 'Sun 18.1.2025',
          description: 'A beautiful trail with amazing views of the valley',
          enabled: false
        },
        {
          id: '4',
          title: 'Biking',
          subtitle: 'Thomas',
          location: 'Mountain biking tour',
          date: 'Wed 21.1.2025',
          description: 'Technical single trails with moderate difficulty',
          enabled: true
        },
      ];
      
      set({
        activities: mockData,
        filteredActivities: mockData,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().filterActivities();
  },
  
  setSelectedFilter: (filter: string) => {
    set({ selectedFilter: filter });
    get().filterActivities();
  },
  
  // Getters (similar to Pinia getters)
  filterActivities: () => {
    const { activities, searchQuery, selectedFilter } = get();
    
    let result = activities;
    
    // Apply category filter
    if (selectedFilter !== 'All') {
      result = result.filter(item => item.title === selectedFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(lowerCaseQuery) ||
          item.location.toLowerCase().includes(lowerCaseQuery) ||
          item.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    set({ filteredActivities: result });
  },
  
  toggleActivityEnabled: (id: string) => {
    const { activities } = get();
    const updatedActivities = activities.map(activity => 
      activity.id === id 
        ? { ...activity, enabled: !activity.enabled } 
        : activity
    );
    
    set({ activities: updatedActivities });
    get().filterActivities();
    
    // In real app, you would call API to update on the server
    // await ActivitiesAPI.update(id, { enabled: !activity.enabled });
  }
}));

export default useActivityStore;