import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; // make sure this path is correct

// Screens
import PayScreen from './screens/PayScreen';
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import EventBookingScreen from './screens/EventBookingScreen';
import SaucesScreen from './screens/SaucesScreen';
import AccountScreen from './screens/AccountScreen';

import WorkoutProgressScreen from './screens/WorkoutProgressScreen';
import WorkoutChoiceScreen from './screens/WorkoutChoiceScreen';
import SnapPhotoScreen from './screens/SnapPhotoScreen'; // <-- this line is missing




const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="WorkoutProgress" component={WorkoutProgressScreen} />
    <HomeStack.Screen name="WorkoutChoiceScreen" component={WorkoutChoiceScreen} />
    <HomeStack.Screen name="SnapPhotoScreen" component={SnapPhotoScreen} />
  </HomeStack.Navigator>
);

const MainDrawer = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeStackNavigator} />
    <Drawer.Screen name="Event Booking" component={EventBookingScreen} />
    <Drawer.Screen name="Sauces" component={SaucesScreen} />
    <Drawer.Screen name="Account" component={AccountScreen} />
  </Drawer.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // prevent flicker

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && (currentUser.emailVerified || currentUser.isAnonymous)) {
        setUser(currentUser); // ✅ allow anonymous too
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  if (loading) return null; // Optional: splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Pay" component={PayScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
