import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Alert, Dimensions, Platform } from 'react-native';
import { 
  Layout, 
  Text, 
  Input, 
  Button, 
  Datepicker, 
  Select, 
  SelectItem,
  Icon,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

// Activity type options
const activityTypes = [
  'Skitour',
  'Hiking',
  'Biking',
  'Climbing',
  'Swimming',
  'Running',
  'Yoga',
  'Tennis',
];

// Icon components
const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />;
const PersonIcon = (props) => <Icon {...props} name="people-outline" />;
const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

export default function CreateActivityScreen() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000)); // Default to 1 hour later
  const [maxParticipants, setMaxParticipants] = useState('10');
  const [address, setAddress] = useState('');
  
  // Map location state
  const [region, setRegion] = useState({
    latitude: 47.3769,  // Default coordinates (Zurich)
    longitude: 8.5417,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  // Separate state for marker position
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 47.3769,
    longitude: 8.5417,
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Animation helper function
  const animateToLocation = (latitude, longitude) => {
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    
    // Verify the map reference exists
    if (mapRef.current) {
      console.log("Animating to:", latitude, longitude);
      
      // Try/catch to handle potential animation issues
      try {
        // Use setTimeout to ensure the map is fully loaded
        setTimeout(() => {
          mapRef.current.animateToRegion(newRegion, 500);
        }, 100);
      } catch (error) {
        console.error("Animation error:", error);
        
        // Fallback: directly update the region state
        setRegion(newRegion);
      }
    } else {
      console.log("Map reference not available");
      setRegion(newRegion);
    }
  };
  
  // Handle map press for location selection
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("Map pressed at:", latitude, longitude);
    
    // Update marker position
    setMarkerPosition({
      latitude,
      longitude,
    });
    
    // Center map on new location
    animateToLocation(latitude, longitude);
  };
  
  // Handle marker drag
  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("Marker drag ended:", latitude, longitude);
    
    setMarkerPosition({
      latitude,
      longitude,
    });
    
    // Center map on new location
    animateToLocation(latitude, longitude);
  };
  
  // Search for address (placeholder - would connect to geocoding service)
  const searchAddress = () => {
    if (!address.trim()) {
      Alert.alert("Error", "Please enter an address to search");
      return;
    }
    
    console.log("Searching for address:", address);
    
    // For demo purposes, simulate finding an address
    setTimeout(() => {
      // Example coordinates (pretending we found the address)
      const foundLatitude = 47.3769 + (Math.random() * 0.02 - 0.01);
      const foundLongitude = 8.5417 + (Math.random() * 0.02 - 0.01);
      
      console.log("Found location:", foundLatitude, foundLongitude);
      
      // Update marker position
      setMarkerPosition({
        latitude: foundLatitude,
        longitude: foundLongitude,
      });
      
      // Center map on new location
      animateToLocation(foundLatitude, foundLongitude);
      
      // Show success alert
      Alert.alert("Address Found", `Location found for: ${address}`);
    }, 1000);
  };
  
  // Handle form submission
  const handleCreateActivity = () => {
    // Validate form
    const newErrors = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!selectedActivityType) newErrors.activityType = 'Activity type is required';
    if (!startDate) newErrors.startDate = 'Start time is required';
    if (!endDate) newErrors.endDate = 'End time is required';
    if (startDate >= endDate) newErrors.endDate = 'End time must be after start time';
    if (!maxParticipants) newErrors.maxParticipants = 'Max participants is required';
    if (parseInt(maxParticipants) < 1) newErrors.maxParticipants = 'Must allow at least 1 participant';
    
    setErrors(newErrors);
    
    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      // Create payload based on the DTO
      const activityData = {
        title,
        description,
        activityType: selectedActivityType,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        maxParticipants: parseInt(maxParticipants),
        latitude: markerPosition.latitude,
        longitude: markerPosition.longitude,
      };
      
      // In a real app, you would post this to your API
      console.log('Submitting activity:', activityData);
      
      // Show success message and navigate back to activities
      Alert.alert(
        "Success",
        "Activity created successfully!",
        [{ text: "OK", onPress: () => router.push('/activities') }]
      );
    }
  };
  
  return (
    <Layout style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text category="h5" style={styles.title}>Create New Activity</Text>
        
        {/* Title */}
        <Input
          label="Title"
          placeholder="Enter activity title"
          value={title}
          onChangeText={setTitle}
          status={errors.title ? 'danger' : 'basic'}
          caption={errors.title}
          style={styles.input}
        />
        
        {/* Activity Type */}
        <Select
          label="Activity Type"
          placeholder="Select activity type"
          value={selectedActivityType}
          onSelect={index => setSelectedActivityType(activityTypes[index.row])}
          status={errors.activityType ? 'danger' : 'basic'}
          caption={errors.activityType}
          style={styles.input}
        >
          {activityTypes.map(type => (
            <SelectItem key={type} title={type} />
          ))}
        </Select>
        
        {/* Description */}
        <Input
          label="Description"
          placeholder="Describe your activity"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          textStyle={{ minHeight: 64 }}
          style={styles.input}
        />
        
        {/* Time Range */}
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Datepicker
              label="Start Time"
              date={startDate}
              onSelect={setStartDate}
              accessoryRight={CalendarIcon}
              status={errors.startDate ? 'danger' : 'basic'}
              caption={errors.startDate}
              style={styles.input}
              min={new Date()}
            />
          </View>
          
          <View style={styles.halfInput}>
            <Datepicker
              label="End Time"
              date={endDate}
              onSelect={setEndDate}
              accessoryRight={CalendarIcon}
              status={errors.endDate ? 'danger' : 'basic'}
              caption={errors.endDate}
              style={styles.input}
              min={startDate}
            />
          </View>
        </View>
        
        {/* Max Participants */}
        <Input
          label="Max Participants"
          placeholder="Enter maximum number of participants"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
          keyboardType="numeric"
          accessoryLeft={PersonIcon}
          status={errors.maxParticipants ? 'danger' : 'basic'}
          caption={errors.maxParticipants}
          style={styles.input}
        />
        
        {/* Location */}
        <Text category="s1" style={styles.locationHeader}>Location</Text>
        
        {/* Address Search */}
        <View style={styles.addressContainer}>
          <Input
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
            style={styles.addressInput}
          />
          <Button
            accessoryLeft={SearchIcon}
            onPress={searchAddress}
            appearance="ghost"
            style={styles.searchButton}
          />
        </View>
        
        {/* Map for location selection */}
        <Text appearance="hint" style={styles.mapHint}>
          Tap on the map to set location or press and hold marker to drag it
        </Text>
        
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={region}
            region={region}
            onPress={handleMapPress}
            onRegionChangeComplete={setRegion}
          >
            <Marker
              coordinate={markerPosition}
              draggable
              onDragEnd={handleMarkerDragEnd}
              tracksViewChanges={false}  // Performance improvement
              pinColor="#3366FF"
            />
          </MapView>
        </View>
        
        {/* Location details */}
        <View style={styles.locationDetails}>
          <Text appearance="hint">
            Latitude: {markerPosition.latitude.toFixed(6)}
          </Text>
          <Text appearance="hint">
            Longitude: {markerPosition.longitude.toFixed(6)}
          </Text>
        </View>
        
        {/* Submit Button */}
        <Button
          style={styles.button}
          onPress={handleCreateActivity}
        >
          Create Activity
        </Button>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  locationHeader: {
    marginTop: 8,
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  addressInput: {
    flex: 1,
  },
  searchButton: {
    width: 50,
  },
  mapHint: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  map: {
    width: Dimensions.get('window').width - 32, // Account for padding
    height: 200,
  },
  locationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
  },
});