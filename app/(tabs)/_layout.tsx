import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Icon components for tab bar
const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // iOS blue
        tabBarInactiveTintColor: '#8E8E93', // iOS gray
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 56 + insets.bottom,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA', // iOS separator color
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon fill={color} width={size} height={size} />,
          headerTitle: 'SportSync',
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, size }) => <CalendarIcon fill={color} width={size} height={size} />,
          headerTitle: 'Activities',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <PersonIcon fill={color} width={size} height={size} />,
          headerTitle: 'Profile',
        }}
      />
    </Tabs>
  );
}