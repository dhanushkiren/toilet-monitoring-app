import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ToiletCard = ({ toilet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(toilet)}>
      <Image
        source={{ uri: toilet.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{toilet.name}</Text>
        <Text style={styles.address}>{toilet.address}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>{toilet.rating?.toFixed(1) ?? 'N/A'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 10,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#444',
  },
});

export default ToiletCard;
