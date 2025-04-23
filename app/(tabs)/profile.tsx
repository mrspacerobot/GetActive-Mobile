import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Layout, Text, Button, Divider } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Layout style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text category="h5">App User</Text>
          <Text category="s1" appearance="hint">user@example.com</Text>
        </View>
      </View>
      
      <Divider />
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text category="h6">12</Text>
          <Text category="c1">Activities</Text>
        </View>
        <View style={styles.statItem}>
          <Text category="h6">5</Text>
          <Text category="c1">Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text category="h6">7</Text>
          <Text category="c1">Upcoming</Text>
        </View>
      </View>
      
      <Divider />
      
      <View style={styles.menuContainer}>
        <Button appearance="ghost" style={styles.menuItem}>My Profile</Button>
        <Button appearance="ghost" style={styles.menuItem}>My Activities</Button>
        <Button appearance="ghost" style={styles.menuItem}>Settings</Button>
        <Button appearance="ghost" status="danger" style={styles.menuItem}>Log Out</Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E4E9F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#007AFF',
  },
  profileInfo: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  menuContainer: {
    paddingTop: 8,
  },
  menuItem: {
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
});