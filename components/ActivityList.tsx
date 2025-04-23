import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';
import { Activity } from '../types/activity.types';
import ActivityCard from './ActivityCard';

interface ActivityListProps {
  activities: Activity[];
  isLoading: boolean;
  onToggleEnabled: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isLoading,
  onToggleEnabled,
}) => {
  const renderActivityItem: ListRenderItem<Activity> = ({ item }) => (
    <ActivityCard 
      activity={item}
      onToggleEnabled={onToggleEnabled}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={renderActivityItem}
      contentContainerStyle={[
        styles.listContent,
        // When empty, add extra padding to keep consistent layout
        activities.length === 0 && styles.emptyListContent
      ]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No activities found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1, // Ensures the content container fills the available space when empty
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40, // Give some space from the top
  },
  emptyText: {
    fontSize: 16,
    color: '#8F9BB3',
    textAlign: 'center',
  }
});

export default ActivityList;