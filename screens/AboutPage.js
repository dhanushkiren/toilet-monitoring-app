import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Appbar, Divider } from 'react-native-paper';

const AboutPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="About" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Toilet Monitoring System 🚻</Text>
        <Divider style={{ marginVertical: 10 }} />
        
        <Text style={styles.paragraph}>
          This project is developed to improve sanitation management in public spaces. It allows users to find nearby toilets and provides administrative features for cleaners, inspectors, and managers to maintain hygiene standards.
        </Text>

        <Text style={styles.subheading}>Key Features</Text>
        <Text style={styles.bullet}>• 🚻 View nearby toilets by gender or accessibility filters</Text>
        <Text style={styles.bullet}>• ✅ Cleaners mark toilets as cleaned</Text>
        <Text style={styles.bullet}>• 🔍 Inspectors submit reports with feedback</Text>
        <Text style={styles.bullet}>• 📊 Managers view performance insights</Text>
        <Text style={styles.bullet}>• 👨‍🏫 Headmaster oversees all operations</Text>

        <Text style={styles.subheading}>Technologies Used</Text>
        <Text style={styles.bullet}>• React Native (Expo) - Public & Mobile UI</Text>
        <Text style={styles.bullet}>• Next.js - Admin Dashboard</Text>
        <Text style={styles.bullet}>• Spring Boot - Backend API</Text>
        <Text style={styles.bullet}>• MongoDB - Database</Text>

        <Text style={styles.subheading}>Purpose</Text>
        <Text style={styles.paragraph}>
          This project aims to digitize toilet maintenance, encourage transparency, and promote hygiene in schools and public areas—starting with the school ecosystem.
        </Text>

        <Text style={styles.subheading}>Made with ❤️ by Dhanush Kiren</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 4,
    color: '#333',
  },
});

export default AboutPage;
