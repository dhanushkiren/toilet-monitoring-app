import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import UserStack from './navigation/UserStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
          <UserStack />
          </GestureHandlerRootView>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
