import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button } from '@ui-kitten/components';

interface FilterTabsProps {
  filters: string[];
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  filters,
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
    >
      {filters.map((filter) => (
        <View key={filter} style={styles.buttonWrapper}>
          <Button
            size="small"
            appearance={selectedFilter === filter ? 'filled' : 'outline'}
            onPress={() => onSelectFilter(filter)}
            style={styles.filterButton}
          >
            {filter}
          </Button>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center', // This ensures buttons align vertically
  },
  buttonWrapper: {
    // This wrapper constrains the button without explicit height
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    borderRadius: 16,
    minWidth: 80,
    height: 36, // <- Consistent height for all filter buttons
  paddingHorizontal: 12, // Optional for consistent spacing
  },
});

export default FilterTabs;