import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Alert, TouchableOpacity, SafeAreaView, StatusBar, Platform  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toilets } from '../utils/data';
import { } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ToiletDetails = ({ route, navigation }) => {
  const { toiletId } = route.params;
  const toilet = toilets.find(t => t.id === toiletId);

  const [remarks, setRemarks] = useState('');
  const [inventoryResponses, setInventoryResponses] = useState({});
  

 if (!toilet) {
  const [countdown, setCountdown] = useState(5); // Start from 5

  useEffect(() => {
    if (countdown === 0) {
      navigation.goBack(); // Go back when countdown hits 0
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.notFoundContainer}>
        <MaterialIcons name="error-outline" size={64} color="#CCC" />
        <Text style={styles.notFound}>Toilet not found. Returning in {countdown} seconds...</Text>
      </View>
    </SafeAreaView>
  );
}

  const handleAcceptCleaning = () => {
    Alert.alert('Success', `Cleaning report for Toilet ${toilet.id} has been accepted.`);
  };

  const handleRejectCleaning = () => {
    if (!remarks.trim()) {
      Alert.alert('Missing Information', 'Please provide remarks when rejecting a cleaning report.');
      return;
    }
    Alert.alert('Rejected', `Cleaning report rejected. Remarks: ${remarks}`);
  };

  const handleApproveItem = (item) => {
    setInventoryResponses(prev => ({ ...prev, [item]: 'approved' }));
  };

  const handleRejectItem = (item) => {
    setInventoryResponses(prev => ({ ...prev, [item]: 'rejected' }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return '#999';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
    
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
    </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View style={styles.idBadge}>
            <MaterialIcons name="business" size={20} color="#4A4A4A" />
            <Text style={styles.idText}>ID: {toilet.id}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.infoText}>{toilet.cleanerName} (ID: {toilet.cleanerId})</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.infoText}>Last cleaned: {toilet.lastCleaned}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{toilet.location.address}</Text>
        </View>
      </View>

      {/* Cleaning Report Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="cleaning-services" size={24} color="#4A4A4A" />
          <Text style={styles.sectionTitle}>Cleaning Report</Text>
        </View>
        
        <View style={styles.imageComparison}>
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>Before Cleaning</Text>
            <Image source={{ uri: toilet.images.before }} style={styles.image} />
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.imageLabel}>After Cleaning</Text>
            <Image source={{ uri: toilet.images.after }} style={styles.image} />
          </View>
        </View>
        
        <View style={styles.remarksContainer}>
          <Text style={styles.inputLabel}>Supervisor Remarks</Text>
          <TextInput
            placeholder="Add remarks if rejecting the cleaning report..."
            value={remarks}
            onChangeText={setRemarks}
            style={styles.remarksInput}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.acceptButton} 
            onPress={handleAcceptCleaning}
            activeOpacity={0.8}
          >
            <MaterialIcons name="check-circle" size={20} color="#fff" />
            <Text style={styles.acceptButtonText}>Accept Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.rejectButton} 
            onPress={handleRejectCleaning}
            activeOpacity={0.8}
          >
            <MaterialIcons name="cancel" size={20} color="#fff" />
            <Text style={styles.rejectButtonText}>Reject Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Inventory Requests Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="inventory" size={24} color="#4A4A4A" />
          <Text style={styles.sectionTitle}>Inventory Requests</Text>
        </View>
        
        {toilet.inventoryNeeded.length > 0 ? (
          <View style={styles.inventoryList}>
            {toilet.inventoryNeeded.map((item, i) => (
              <View key={i} style={styles.inventoryItem}>
                <View style={styles.itemInfo}>
                  <MaterialIcons name="inventory-2" size={18} color="#666" />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
                
                <View style={styles.itemActions}>
                  <TouchableOpacity 
                    style={[styles.miniButton, styles.approveButton]} 
                    onPress={() => handleApproveItem(item)}
                  >
                    <MaterialIcons name="check" size={16} color="#fff" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.miniButton, styles.rejectMiniButton]} 
                    onPress={() => handleRejectItem(item)}
                  >
                    <MaterialIcons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                
                {inventoryResponses[item] && (
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(inventoryResponses[item]) }]}>
                    <Text style={styles.statusIndicatorText}>
                      {inventoryResponses[item].toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="check-circle-outline" size={32} color="#CCC" />
            <Text style={styles.emptyText}>No inventory requests</Text>
          </View>
        )}
      </View>

      {/* Damage Reports Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="report-problem" size={24} color="#FF9800" />
          <Text style={styles.sectionTitle}>Damage Reports</Text>
        </View>
        
        {toilet.damageReports.length > 0 ? (
          <View style={styles.damageList}>
            {toilet.damageReports.map((item, i) => (
              <View key={i} style={styles.damageItem}>
                <MaterialIcons name="warning" size={18} color="#FF9800" />
                <Text style={styles.damageText}>{item}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="verified" size={32} color="#4CAF50" />
            <Text style={styles.emptyText}>No damages reported</Text>
          </View>
        )}
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="feedback" size={24} color="#4A4A4A" />
          <Text style={styles.sectionTitle}>User Feedback</Text>
        </View>
        
        <View style={styles.feedbackList}>
          {toilet.feedbacks.map((f, i) => (
            <View key={i} style={styles.feedbackItem}>
              <MaterialIcons name="chat-bubble-outline" size={16} color="#666" />
              <Text style={styles.feedbackText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => Alert.alert('Feature', 'Assign new cleaning schedule')}>
          <MaterialIcons name="schedule" size={20} color="#4A4A4A" />
          <Text style={styles.footerButtonText}>Assign Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton} onPress={() => Alert.alert('Feature', 'View cleaning history')}>
          <MaterialIcons name="history" size={20} color="#4A4A4A" />
          <Text style={styles.footerButtonText}>View History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#FAFAFA',
},
headerBar: {
  height: 86,
  flexDirection: 'row',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  alignItems: 'center',
  paddingHorizontal: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#E0E0E0',
  backgroundColor: '#FAFAFA',
},
backButton: {
  padding: 8,
},
  scrollContent: {
    paddingBottom: 30,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  idText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    marginLeft: 6,
  },
  statusBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginLeft: 12,
  },
  imageComparison: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  imageContainer: {
    flex: 1,
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  remarksContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  remarksInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#FAFAFA',
    minHeight: 80,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  rejectButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  inventoryList: {
    padding: 20,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  miniButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectMiniButton: {
    backgroundColor: '#F44336',
  },
  statusIndicator: {
    position: 'absolute',
    right: -8,
    top: -8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusIndicatorText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    marginTop: 8,
  },
  damageList: {
    padding: 20,
  },
  damageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  damageText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  feedbackList: {
    padding: 20,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  feedbackText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  footerButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  footerButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A4A4A',
    marginLeft: 8,
  },
});

export default ToiletDetails;