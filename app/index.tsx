import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import useActivityStore from '../store/activityStore';

export default function HomeScreen() {
  const router = useRouter();
  const { fetchActivities } = useActivityStore();

  useEffect(() => {
    // Pre-fetch activities when app launches
    fetchActivities();
  }, []);

  return (
    <Layout style={styles.container}>
      <View style={styles.main}>
        <Text category="h1" style={styles.title}>SportSync</Text>
        <Text category="p1" style={styles.subtitle}>
          Find and join sports activities in your area
        </Text>
        
        <Button 
          style={styles.button}
          onPress={() => router.push('/activities')}
        >
          View Activities
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
  },
});