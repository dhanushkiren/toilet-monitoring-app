import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ToiletCleaningScreen = ({ route, navigation }) => {
  const { toiletId , schedule } = route.params;
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null);

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      if (type === 'before' && beforeImages.length < 4) {
        setBeforeImages([...beforeImages, newUri]);
      } else if (type === 'after' && afterImages.length < 4) {
        setAfterImages([...afterImages, newUri]);
      } else {
        Alert.alert('Maximum of 4 images allowed for each.');
      }
    }
  };

  const handleSubmit = () => {
    if (!status || beforeImages.length === 0 || afterImages.length === 0) {
      Alert.alert('Please fill all required fields.');
      return;
    }

    // Submit logic
    console.log({
      toiletId,
      status,
      beforeImages,
      afterImages,
      notes,
    });

    Alert.alert('Cleaning Report Submitted');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Toilet ID: {toiletId}</Text>

      {schedule && (
        <Text style={styles.schedule}>
            🕒 Schedule: <Text style={{ fontWeight: '600' }}>{schedule}</Text>
        </Text>
        )}

      <Text style={styles.label}>Cleaning Status</Text>
      <View style={styles.statusRow}>
        <TouchableOpacity
          style={[styles.statusBtn, status === 'Cleaned' && styles.selected]}
          onPress={() => setStatus('Cleaned')}
        >
          <Text style={styles.statusText}>✅ Cleaned</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusBtn, status === 'Not Cleaned' && styles.selectedRed]}
          onPress={() => setStatus('Not Cleaned')}
        >
          <Text style={styles.statusText}>❌ Not Cleaned</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Before Cleaning Images (Max 4)</Text>
      <View style={styles.imageRow}>
        {beforeImages.map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.image} />
        ))}
        {beforeImages.length < 4 && (
          <TouchableOpacity style={styles.imageUpload} onPress={() => pickImage('before')}>
            <Text style={styles.uploadText}>+ Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.label}>After Cleaning Images (Max 4)</Text>
      <View style={styles.imageRow}>
        {afterImages.map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.image} />
        ))}
        {afterImages.length < 4 && (
          <TouchableOpacity style={styles.imageUpload} onPress={() => pickImage('after')}>
            <Text style={styles.uploadText}>+ Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        placeholder="Additional Notes (optional)"
        style={styles.notes}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('DamageReportScreen', { toiletId })}
      >
        <Text style={styles.secondaryText}>🚨 Report Damage</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate('InventoryRequestScreen', { toiletId })}
      >
        <Text style={styles.secondaryText}>📦 Request Inventory</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#2196F3' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  statusRow: { flexDirection: 'row', marginBottom: 15 },
  statusBtn: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  selected: { backgroundColor: '#A5D6A7' },
  selectedRed: { backgroundColor: '#EF9A9A' },
  statusText: { fontSize: 16 },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  imageUpload: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedule: {
  fontSize: 16,
  color: '#555',
  marginBottom: 20,
},
  image: { width: 80, height: 80, borderRadius: 8 },
  uploadText: { color: '#555' },
  notes: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  secondaryBtn: {
    backgroundColor: '#FFECB3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryText: { color: '#333', fontSize: 15, fontWeight: '600' },
});

export default ToiletCleaningScreen;
