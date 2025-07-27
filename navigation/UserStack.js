import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ToiletDetailScreen from '../screens/ToiletDetailScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import AboutPage from '../screens/AboutPage';
import LoginScreen from '../screens/Login';
import SupervisorHomePage from '../screens/SupervisorHomePage';
import ToiletDetails from '../screens/ToiletDetails';
import CleanerManagementScreen from '../screens/CleanerManagementScreen';
import CreateCleanerScreen from '../screens/CreateCleanerScreen';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ToiletDetail" component={ToiletDetailScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="About" component={AboutPage} />
      <Stack.Screen name="SupervisorHome" component={SupervisorHomePage} />
      <Stack.Screen name="ToiletDetails" component={ToiletDetails} />
      <Stack.Screen name="CleanerManagementScreen" component={CleanerManagementScreen} />
      <Stack.Screen name="CreateCleanerScreen" component={CreateCleanerScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
