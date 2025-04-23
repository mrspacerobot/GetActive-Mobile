import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { Card, Text, Button, Icon, Divider } from '@ui-kitten/components';
import { Activity } from '../types/activity.types';

interface ActivityCardProps {
  activity: Activity;
  onToggleEnabled: (id: string) => void;
}

const MoreIcon = (props) => <Icon {...props} name="more-vertical-outline" />;

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onToggleEnabled }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <RNText style={styles.avatarText}>{activity.subtitle.charAt(0).toUpperCase()}</RNText>
        </View>
        <View style={styles.headerTextContainer}>
          <Text category="h6">{activity.title}</Text>
          <Text category="s2" appearance="hint">{activity.subtitle}</Text>
        </View>
        <Button
          appearance="ghost"
          accessoryLeft={MoreIcon}
          size="small"
        />
      </View>

      <Divider />

      <View style={styles.imageContainer}>
        <View style={styles.shapes}>
          <View style={[styles.shape, styles.triangle]} />
          <View style={[styles.shape, styles.square]} />
          <View style={[styles.shape, styles.circle]} />
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text category="s1" style={styles.locationText}>{activity.location}</Text>
        <Text category="c1" appearance="hint" style={styles.dateText}>{activity.date}</Text>
        <Text style={styles.descriptionText}>{activity.description}</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            size="small"
            appearance="outline"
            status="basic"
            style={styles.enableButton}
            onPress={() => onToggleEnabled(activity.id)}
          >
            Enabled
          </Button>
          <Button
            size="small"
            status="primary"
            onPress={() => onToggleEnabled(activity.id)}
          >
            Enabled
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E4E9F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF', // iOS blue
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  imageContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7', // iOS light gray
  },
  shapes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shape: {
    margin: 10,
    backgroundColor: '#C7C7CC', // iOS system gray color
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#C7C7CC',
  },
  square: {
    width: 50,
    height: 50,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardContent: {
    padding: 16,
  },
  locationText: {
    fontWeight: '600',
    marginBottom: 4,
  },
  dateText: {
    marginBottom: 8,
  },
  descriptionText: {
    marginBottom: 16,
    color: '#3C3C43', // iOS label color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  enableButton: {
    marginRight: 10,
  },
});

export default ActivityCard;