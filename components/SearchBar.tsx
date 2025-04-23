import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

// Icon components
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;
const ClearIcon = (props) => <Icon {...props} name="close-outline" />;

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search activities...',
}) => {
  const renderClearButton = (props) => (
    value.length > 0 ? (
      <Icon
        {...props}
        name="close-outline"
        onPress={() => onChangeText('')}
      />
    ) : null
  );

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      accessoryLeft={SearchIcon}
      accessoryRight={renderClearButton}
      style={styles.searchInput}
      size="medium"
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
});

export default SearchBar;