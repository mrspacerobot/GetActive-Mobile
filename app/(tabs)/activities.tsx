import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useActivityStore from '../../store/activityStore';

// Import reusable components
import SearchBar from '@/components/SearchBar';
import FilterTabs from '@/components/FilterTabs';
import ActivityList from '@//components/ActivityList';

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  
  // Using the store
  const {
    filteredActivities,
    isLoading,
    searchQuery,
    selectedFilter,
    setSearchQuery,
    setSelectedFilter,
    toggleActivityEnabled,
  } = useActivityStore();

  // Sample filter categories
  const filters: string[] = ['All', 'Skitour', 'Hiking', 'Biking', 'Climbing', 'Swimming', 'Running', 'Yoga', 'Tennis'];

  return (
    <Layout style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Search Bar Section */}
      <View style={styles.searchSection}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Tabs Section with visual separator */}
      <View style={styles.filterSection}>
        <FilterTabs 
          filters={filters}
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />
      </View>

      {/* Activities List Section - uses flex: 1 to fill remaining space */}
      <View style={styles.listSection}>
        <ActivityList 
          activities={filteredActivities}
          isLoading={isLoading}
          onToggleEnabled={toggleActivityEnabled}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FC',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterSection: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // iOS separator color
    minHeight: 60,
    justifyContent: 'center'
  },
  listSection: {
  },
});