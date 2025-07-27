import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import SettingsDrawer from '../components/SettingsDrawer';
import { toilets } from '../utils/data';

const SupervisorHomePage = ({ navigation, route }) => {
  const [toiletId, setToiletId] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true after login

  useEffect(() => {
    if (route.params?.loggedIn) {
      setIsLoggedIn(true);
    }
  }, [route.params?.loggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.replace('Home'); // Go back to public map/home screen
  };

  const handleSearch = () => {
    navigation.navigate('ToiletDetails', { toiletId });
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => navigation.navigate('ToiletDetails', { toiletId: item.id })}
    >
      <Text style={styles.toiletId}>{item.id} - {item.status}</Text>
      <Text style={styles.location}>{item.location.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Toilets</Text>
        <IconButton
          icon="cog"
          size={24}
          color="#2196F3"
          onPress={() => setSettingsVisible(true)}
        />
      </View>

      <View style={styles.bodycontent}>
        <Text style={styles.headerTitle}>Supervisor Search</Text>
        <TextInput
          placeholder="Enter Toilet ID"
          value={toiletId}
          onChangeText={setToiletId}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      <SettingsDrawer
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        navigation={navigation}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate('CleanerManagementScreen')}
      >
        <Text style={styles.actionText}>List All Cleaners</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => navigation.navigate('CreateCleanerScreen')}
      >
        <Text style={styles.actionText}>Create Cleaner ID</Text>
      </TouchableOpacity>

      {/* 🔽 Embedded Pending Tasks Section */}
      <Text style={styles.pendingTitle}>Pending Tasks</Text>
      <FlatList
        data={toilets}
        keyExtractor={(item) => item.id}
        renderItem={renderTaskItem}
        contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  bodycontent: { padding: 30, justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  taskItem: {
    backgroundColor: '#f1f9ff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  toiletId: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  location: { color: '#555' },
});

export default SupervisorHomePage;
