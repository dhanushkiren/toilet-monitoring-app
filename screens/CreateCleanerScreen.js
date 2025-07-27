// screens/CreateCleanerScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const CreateCleanerScreen = () => {
  const [name, setName] = useState('');
  const [cleanerId, setCleanerId] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    if (!name || !cleanerId || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    // Handle creation logic
    console.log('Cleaner Created:', { name, cleanerId, password });
    Alert.alert('Cleaner Created Successfully');
    setName('');
    setCleanerId('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Cleaner</Text>
      <TextInput
        placeholder="Cleaner Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Cleaner ID"
        value={cleanerId}
        onChangeText={setCleanerId}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleCreate} style={styles.btn}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2196F3', marginBottom: 15 },
  input: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  btn: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CreateCleanerScreen;
