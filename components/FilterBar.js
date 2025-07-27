import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const options = [
  { label: 'All', value: null, icon: '📋' },
  { label: 'Male', value: 'male', icon: '🚹' },
  { label: 'Female', value: 'female', icon: '🚺' },
  { label: 'Trans', value: 'trans', icon: '🏳️‍⚧️' },
  { label: 'Disabled', value: 'disabled', icon: '♿' },
];

const FilterBar = ({ selected, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterWrapper}>
        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <TouchableOpacity
              key={opt.value ?? 'all'}
              style={[
                styles.button,
                isActive && styles.activeButton,
              ]}
              onPress={() => onChange(opt.value)}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={[styles.icon, isActive && styles.activeIcon]}>
                  {opt.icon}
                </Text>
                <Text style={[styles.text, isActive && styles.activeText]}>
                  {opt.label}
                </Text>
              </View>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  filterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 2,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  activeButton: {
    backgroundColor: '#4c6ef5',
    borderColor: '#364fc7',
    transform: [{ scale: 1.02 }],
    shadowColor: '#4c6ef5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    marginBottom: 4,
    opacity: 0.8,
  },
  activeIcon: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  activeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '50%',
    transform: [{ translateX: -6 }],
    width: 12,
    height: 3,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

export default FilterBar;

