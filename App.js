import * as React from 'react';
import { StyleSheet, Text, View, ScrollView , StatusBar, Alert } from 'react-native';
import { NavigationContainer, NavigationAction } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scheduling from './screens/SchedulingScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import Results from './screens/ReviewResults';
import SignIn from './screens/SignIn'
import Landing from './screens/Landing'
import History from './screens/History'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { Logs } from 'expo'
import * as LocalAuthentication from 'expo-local-authentication';

Logs.enableExpoCliLogging()

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();


export default function App() {

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    //switch back to false

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });



  function onAuthenticate () {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Please Enter Passcode or Scan Fingerprint to Login to App!',
      fallbackLabel: 'Enter passcode',
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
      console.log(result.error);
      if (result.error =='not_enrolled') {
        setIsAuthenticated("true");
        Alert.alert("Alert!", "We recomend setting a passcode on your phone for security!", [
          {text: "OK", onPress: () => console.log("OK Pressed")}
        ]);
      }
    }
  );
  }



  return (
      <View style={styles.container}>
      { isAuthenticated
        ? <Landing />
        : <SignIn onAuthenticate = {onAuthenticate} />
      }

      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});