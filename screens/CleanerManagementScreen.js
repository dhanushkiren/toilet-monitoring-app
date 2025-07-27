// screens/CleanerManagementScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyCleaners = [
  { id: 'CL001', name: 'Ravi Kumar' },
  { id: 'CL002', name: 'Priya Devi' },
];

const CleanerManagementScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cleanerItem}>
      <Text style={styles.cleanerName}>{item.name}</Text>
      <Text style={styles.cleanerId}>ID: {item.id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cleaners Created</Text>
      <FlatList
        data={dummyCleaners}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2196F3', marginBottom: 15 },
  cleanerItem: {
    padding: 15,
    backgroundColor: '#e6f2ff',
    borderRadius: 8,
    marginBottom: 10,
  },
  cleanerName: { fontSize: 16, fontWeight: '600' },
  cleanerId: { fontSize: 14, color: '#555' },
});

export default CleanerManagementScreen;
