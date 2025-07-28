import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const schedules = [
  { id: 'morning', label: '🌅 Morning (10:00 AM - 11:00 AM)' },
  { id: 'afternoon', label: '🌞 Afternoon (1:00 PM - 2:00 PM)' },
  { id: 'night', label: '🌙 Night (8:00 PM - 9:00 PM)' },
];

const assignedToilets = [
  { id: 'T001', location: 'Bus Stand Toilet' },
  { id: 'T002', location: 'Market Street Toilet' },
  { id: 'T003', location: 'Temple Side Toilet' },
];

const CleanerHomeScreen = () => {
  const navigation = useNavigation();
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleToiletPress = (toilet) => {
    if (!selectedSchedule) {
      ToastAndroid.show('⚠️ Please select a schedule first!', ToastAndroid.SHORT);
      return;
    }

    navigation.navigate('ToiletCleaningScreen', {
      toiletId: toilet.id,
      schedule: selectedSchedule,
    });
  };

  const renderToilet = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleToiletPress(item)}>
      <Text style={styles.toiletId}>🧻 Toilet ID: {item.id}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🕒 Today's Schedules</Text>
      <View style={styles.scheduleContainer}>
        {schedules.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[
              styles.scheduleItem,
              selectedSchedule === s.id && styles.selectedSchedule,
            ]}
            onPress={() => setSelectedSchedule(s.id)}
          >
            <Text style={styles.scheduleText}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 25 }]}>🧼 Assigned Toilets</Text>
      <FlatList
        data={assignedToilets}
        renderItem={renderToilet}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1976D2', marginBottom: 12 },

  scheduleContainer: { flexDirection: 'column', gap: 10 },
  scheduleItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  selectedSchedule: {
    backgroundColor: '#90CAF9',
  },
  scheduleText: {
    fontSize: 16,
    color: '#444',
  },

  card: {
    backgroundColor: '#F1F8E9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  toiletId: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  location: { fontSize: 14, color: '#555', marginTop: 4 },
});

export default CleanerHomeScreen;
