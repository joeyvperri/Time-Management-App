import * as React from "react";
import {StyleSheet, Text, View, ScrollView, StatusBar, LogBox} from "react-native";
import {NavigationContainer, NavigationAction} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Scheduling from "./SchedulingScreen";
import ChatBotScreen from "./ChatBotScreen";
import Results from "./ReviewResults";
import SignIn from "./SignIn";
import ToDoScreen from "./ToDoScreen";
import History from "./History";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
LogBox.ignoreAllLogs();

export default function Landing() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === "History") {
              iconName = focused ? "book" : "book";
            } else if (route.name === "Results") {
              iconName = focused ? "bar-chart" : "ios-bar-chart";
            } else if (route.name === "Support") {
              iconName = focused ? "chatbox" : "ios-chatbox";
            } else if (route.name === "Scheduling") {
              iconName = focused ? "calendar" : "calendar";
            } else if (route.name === "ToDo") {
              iconName = focused ? "checkbox" : "ios-checkbox";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#85e0e0",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen
          name="Scheduling"
          component={Scheduling}
          options={{
            title: "Scheduling",
            headerStyle: {
              backgroundColor: "#7acfcf"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Tab.Screen
          name="Results"
          component={Results}
          options={{
            title: "Results",
            headerStyle: {
              backgroundColor: "#7acfcf"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />

        <Tab.Screen
          name="Support"
          component={ChatBotScreen}
          options={{
            title: "Support",
            headerStyle: {
              backgroundColor: "#7acfcf"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            title: "History",
            headerStyle: {
              backgroundColor: "#7acfcf"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Tab.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{
            title: "ToDo",
            headerStyle: {
              backgroundColor: "#7acfcf"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}