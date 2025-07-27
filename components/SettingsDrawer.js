import React from 'react';
import { View, StyleSheet, TouchableOpacity,Modal, FlatList, Pressable } from 'react-native';
import { Text, IconButton, Divider, Switch, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const languages = ['English', 'Tamil', 'Hindi', 'Telugu', 'Malayalam'];

const SettingsDrawer = ({ visible, onClose, darkMode, onToggleDarkMode,navigation,  isLoggedIn, onLogout  }) => {
    const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  const handleLanguageChange = (lang) => {
    setShowLanguageModal(false);
    // You can store selected lang if needed
  };
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <IconButton icon="close" size={24} onPress={onClose} />
        </View>

        <Divider />

        <List.Item
          title="Change Language"
          left={() => <Ionicons name="language" size={24} color="#2196F3" />}
          onPress={() => setShowLanguageModal(true)}
        />
        {/* Language Modal */}
        <Modal visible={showLanguageModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Choose Language</Text>
              <FlatList
                data={languages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleLanguageChange(item)} style={styles.languageOption}>
                    <Text style={styles.languageText}>{item}</Text>
                  </Pressable>
                )}
              />
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Text style={{ color: '#2196F3', textAlign: 'center', marginTop: 10 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <List.Item
          title="About"
          left={() => <Ionicons name="information-circle" size={24} color="#2196F3" />}
         onPress={() => {
            onClose(); // Close the drawer
            navigation.navigate('About'); // Navigate to about page
            }}
        />

        <List.Item
          title="Dark Mode"
          left={() => <Ionicons name="moon" size={24} color="#2196F3" />}
          right={() => (
            <Switch value={darkMode} onValueChange={onToggleDarkMode} />
          )}
        />

        <View style={styles.bottomSection}>
          <Divider />
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => {
                onClose();
                if (isLoggedIn) {
                onLogout(); // call logout function
                } else {
                navigation.navigate('Login');
                }
            }}
            >
            <Ionicons 
                name={isLoggedIn ? "log-out-outline" : "person-circle"} 
                size={24} 
                color="#2196F3" 
            />
            <Text style={styles.loginText}>
                {isLoggedIn ? "Logout" : "Administrator Login"}
            </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  drawer: {
    width: '75%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  loginText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContainer: {
  width: 300,
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  elevation: 5,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
languageOption: {
  paddingVertical: 12,
},
languageText: {
  fontSize: 16,
  color: '#333',
},

});

export default SettingsDrawer;
