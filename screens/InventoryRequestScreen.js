import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

const itemsList = [
  'Disinfectant',
  'Cleaning Brush',
  'Gloves',
  'Phenyl',
  'Bucket',
  'Detergent',
  'Bleaching Powder',
  'Mask',
];

const InventoryRequestScreen = ({ route, navigation }) => {
  const { toiletId } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      Alert.alert('Please select at least one item');
      return;
    }

    const requestData = {
      toiletId,
      items: selectedItems,
      notes,
    };

    console.log('Inventory Request:', requestData);
    Alert.alert('Inventory request submitted successfully');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inventory Request - Toilet ID: {toiletId}</Text>
      <Text style={styles.label}>Select Needed Items</Text>

      <View style={styles.itemsContainer}>
        {itemsList.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
            onPress={() => toggleItem(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.notes}
        placeholder="Additional notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#4CAF50',
  },
  itemText: {
    color: '#333',
  },
  notes: {
    borderColor: '#ccc',
    borderWidth: 1.2,
    borderRadius: 10,
    padding: 12,
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InventoryRequestScreen;
