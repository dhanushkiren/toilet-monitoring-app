import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const DamageReportScreen = ({ route, navigation }) => {
  const { toiletId } = route.params;
  const [damageType, setDamageType] = useState('');
  const [description, setDescription] = useState('');
  const [damageImage, setDamageImage] = useState(null);

  const damageTypes = ['Mug', 'Tap', 'Water Pipe', 'Door', 'Flush', 'Other'];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      setDamageImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!damageType || !description || !damageImage) {
      Alert.alert('Please fill all fields and upload an image');
      return;
    }

    // Handle damage report logic
    console.log({
      toiletId,
      damageType,
      description,
      damageImage,
    });

    Alert.alert('Damage report submitted successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Damage - Toilet ID: {toiletId}</Text>

      <Text style={styles.label}>Select Damage Type</Text>
      <View style={styles.damageTypeContainer}>
        {damageTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.damageType,
              damageType === type && styles.selectedType,
            ]}
            onPress={() => setDamageType(type)}
          >
            <Text style={styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Describe the issue..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {damageImage ? (
          <Image source={{ uri: damageImage }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Damage Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#e53935', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  damageTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  damageType: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedType: {
    backgroundColor: '#f44336',
  },
  typeText: {
    color: '#333',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageText: { color: '#888' },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  submitBtn: {
    backgroundColor: '#e53935',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default DamageReportScreen;
