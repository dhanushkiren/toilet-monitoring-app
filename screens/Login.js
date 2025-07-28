import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('supervisor'); // default selection

  const handleLogin = () => {
    if (userType === 'supervisor' && username === 'Dk' && password === 'Dk') {
      navigation.replace('SupervisorHome', { loggedIn: true });
    } else if (userType === 'cleaner' && username === 'cl' && password === 'cl') {
      navigation.replace('CleanerHome', { loggedIn: true });
    } else {
      Alert.alert('Invalid credentials', 'Please check username, password or role.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchBtn,
            userType === 'supervisor' && styles.activeSwitch,
          ]}
          onPress={() => setUserType('supervisor')}
        >
          <Text
            style={[
              styles.switchText,
              userType === 'supervisor' && styles.activeText,
            ]}
          >
            Supervisor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchBtn,
            userType === 'cleaner' && styles.activeSwitch,
          ]}
          onPress={() => setUserType('cleaner')}
        >
          <Text
            style={[
              styles.switchText,
              userType === 'cleaner' && styles.activeText,
            ]}
          >
            Cleaner
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login as {userType}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 30,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  switchBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeSwitch: {
    backgroundColor: '#2196F3',
  },
  switchText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;
