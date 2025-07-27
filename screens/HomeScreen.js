import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  View, 
  PanResponder,
  StyleSheet, 
  Platform, ScrollView, TouchableOpacity,
  ActivityIndicator, 
  Animated,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Text, FAB, Searchbar, Card, Chip,IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FilterBar from '../components/FilterBar';
import { getNearbyToilets } from '../utils/api';
import { getDistanceFromLatLonInKm } from '../utils/distance';
import ToiletCard from '../components/ToiletCard';
import SettingsDrawer from '../components/SettingsDrawer';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toilets, setToilets] = useState([]);
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToiletList, setShowToiletList] = useState(false);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

const panResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 10; // start responding on slight vertical move
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        // Only allow dragging down
        slideAnim.setValue(height / 2 + gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        // If dragged down enough, close it
        Animated.spring(slideAnim, {
          toValue: height,
          useNativeDriver: true,
        }).start(() => setShowToiletList(false));
      } else {
        // else bounce back up
        Animated.spring(slideAnim, {
          toValue: height / 2,
          useNativeDriver: true,
        }).start();
      }
    },
  })
).current;


  useEffect(() => {
    initializeLocation();
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const initializeLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to find nearby toilets.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.requestForegroundPermissionsAsync() }
          ]
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc.coords);
      fetchToilets(loc.coords);
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location. Please try again.');
      console.error('Location error:', error);
    }
  };

  const fetchToilets = async (coords, activeFilter = filter) => {
  try {
    setLoading(true);
    const data = await getNearbyToilets(coords.latitude, coords.longitude, activeFilter);
    setToilets(data);
  } catch (err) {
    Alert.alert('Error', 'Failed to fetch nearby toilets. Please try again.');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const handleFilterChange = (value) => {
    setFilter(value);
    if (location) {
      fetchToilets(location, value);
    }
  };

  const handleMarkerPress = (toilet) => {
    setSelectedToilet(toilet);
    // Center map on selected toilet
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: toilet.lat,
        longitude: toilet.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 500);
    }
  };

  const toggleToiletList = () => {
    const toValue = showToiletList ? height : height * 0;
    setShowToiletList(!showToiletList);
    
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  const filteredToilets = useMemo(() => {
  if (!location) return [];

  return toilets.filter(toilet => {
    const distance = getDistanceFromLatLonInKm(
      location.latitude,
      location.longitude,
      toilet.lat,
      toilet.lng
    );

    const matchesSearch = toilet.name.toLowerCase().includes(searchQuery.toLowerCase()) || toilet.address.toLowerCase().includes(searchQuery.toLowerCase());
    return distance <= 20 && matchesSearch;
  });
}, [toilets, searchQuery, location]);


  const getToiletStatusColor = (toilet) => {
    if (toilet.isOpen) return '#4CAF50';
    if (toilet.status === 'maintenance') return '#FF9800';
    return '#F44336';
  };

  const customMapStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [{ "visibility": "off" }]
    }
  ];

  if (!location) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
        <LinearGradient
          colors={['#2196F3', '#21CBF3']}
          style={styles.loadingContainer}
        >
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Finding your location...</Text>
            <Text style={styles.loadingSubtext}>
              Please make sure location services are enabled
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find Toilets</Text>
          <View style={styles.headerStats}>
            <Chip 
              icon="map-marker" 
              style={styles.statsChip}
              textStyle={styles.statsText}
            >
              {toilets.length} nearby
            </Chip>
            <IconButton
              icon="cog"
              size={24}
              color="#2196F3"
              onPress={() => setSettingsVisible(true)}
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>

        {/* Search Bar */}
        {/* <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search toilets, locations..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor="#2196F3"
            inputStyle={styles.searchInput}
          />
        </View> */}

        {/* Filter Bar */}
        <FilterBar selected={filter} onChange={handleFilterChange} />

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton={false}
            customMapStyle={customMapStyle}
            onMapReady={() => setMapReady(true)}
            loadingEnabled
            loadingIndicatorColor="#2196F3"
          >
            {filteredToilets.map((toilet) => (
              <Marker
                key={toilet.id}
                coordinate={{ latitude: toilet.lat, longitude: toilet.lng }}
                title={toilet.name}
                description={toilet.address}
                pinColor={getToiletStatusColor(toilet)}
                onPress={() => handleMarkerPress(toilet)}
              />
            ))}
          </MapView>

          {/* Map Controls */}
          <View style={styles.mapControls}>
            <FAB
              style={styles.myLocationFab}
              small
              icon="crosshairs-gps"
              onPress={centerOnUser}
              color="#2196F3"
            />
            <FAB
              style={styles.listFab}
              small
              icon={showToiletList ? "map" : "format-list-bulleted"}
              onPress={toggleToiletList}
              color="#2196F3"
            />
          </View>

          {/* Loading Overlay */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.overlayText}>Loading toilets...</Text>
            </View>
          )}
        </View>

        {/* Selected Toilet Card */}
        {selectedToilet && (
          <Animated.View style={styles.selectedToiletCard}>
            <Card style={styles.toiletCard}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.toiletName}>{selectedToilet.name}</Text>
                  <Chip 
                    style={[
                      styles.statusChip,
                      { backgroundColor: getToiletStatusColor(selectedToilet) }
                    ]}
                    textStyle={styles.statusText}
                  >
                    {selectedToilet.isOpen ? 'Open' : 'Closed'}
                  </Chip>
                </View>
                <Text style={styles.toiletAddress}>{selectedToilet.address}</Text>
                <View style={styles.cardActions}>
                  <FAB
                    style={styles.actionFab}
                    small
                    icon="directions"
                    onPress={() => navigation.navigate('ToiletDetail', { toilet: selectedToilet })}
                    label="Details"
                  />
                  <FAB
                    style={styles.actionFab}
                    small
                    icon="close"
                    onPress={() => setSelectedToilet(null)}
                  />
                </View>
              </Card.Content>
            </Card>
          </Animated.View>
        )}

        {/* Sliding Toilet List */}
        <Animated.View
          style={[
            styles.toiletListContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.listHeader}>
            <View style={styles.dragHandle} />
            <Text style={styles.listTitle}>Nearby Toilets ({filteredToilets.length})</Text>
            <TouchableOpacity onPress={toggleToiletList} style={{ position: 'absolute', right: 20, top: 15 }}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.toiletList}
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredToilets.map((toilet) => (
              <ToiletCard
                key={toilet.id}
                toilet={toilet}
                onPress={() => {
                  handleMarkerPress(toilet);
                  setShowToiletList(false);
                  Animated.spring(slideAnim, {
                    toValue: height,
                    useNativeDriver: true,
                    tension: 100,
                    friction: 8,
                  }).start();
                }}
                style={styles.listItem}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>
      <SettingsDrawer
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  loadingSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsChip: {
    backgroundColor: '#E3F2FD',
  },
  statsText: {
    alignContent: 'center',
    color: '#2196F3',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mapControls: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    gap: 10,
  },
  myLocationFab: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  listFab: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  selectedToiletCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toiletCard: {
    elevation: 8,
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toiletName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusChip: {
    marginLeft: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  toiletAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionFab: {
    backgroundColor: '#2196F3',
  },
  toiletListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  listHeader: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#BDBDBD',
    borderRadius: 2,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  toiletList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listItem: {
    marginBottom: 10,
  },
});

export default HomeScreen;