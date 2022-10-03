import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenContainer } from "react-native-screens"
import { StyleSheet, Text, View, Dimensions, TextInput, Component, Button, TouchableWithoutFeedback, Keyboard, ScrollView, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native';

import Scheduling from './SchedulingScreen';
import Landing from './SchedulingScreen';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import PagerView from 'react-native-pager-view';



export default function SignInScreen({onAuthenticate}) {

    const[shouldShow, setShouldShow] = useState(false);

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height:100 }}>

          <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>

          <Text style={styles.date_style}>Welcome to The Time Management App</Text>
          <Image style={styles.image} source={require('../assets/logo2.png')}/>


          <TouchableOpacity style={styles.button} onPress={onAuthenticate}>
           <Text style={styles.steelblue}>Press to Login</Text>
           </TouchableOpacity>


           <TouchableOpacity style={styles.button1} onPress={() => setShouldShow(!shouldShow)}>
            <Text style={styles.steelblue1}>Show the Guide</Text>
            </TouchableOpacity>

            <View style={{flex: 1}}>

            {
              shouldShow ? (

                <View style={{ flex: 1 }}>
              <PagerView style={styles.viewPager} initialPage={0}>

              <View style={styles.page} key="1">

              <Image style={styles.image1} source={require('../assets/schedulescreen.png')}/>

              <Text style={styles.label}>1/5</Text>

              </View>

              <View style={styles.page} key="2">
              <Image style={styles.image1} source={require('../assets/resultsscreen.png')}/>

              <Text style={styles.label}>2/5</Text>

              </View>

              <View style={styles.page} key="3">
              <Image style={styles.image1} source={require('../assets/resultsscreen2.png')}/>
              <Text style={styles.label}>3/5</Text>

              </View>

              <View style={styles.page} key="4">
              <Image style={styles.image1} source={require('../assets/todoscreen.png')}/>
              <Text style={styles.label}>4/5</Text>

              </View>

              <View style={styles.page} key="5">
              <Image style={styles.image1} source={require('../assets/historyscreen.png')}/>
              <Text style={styles.label}>5/5</Text>

              </View>

              </PagerView>
              </View>


              ) : null
            }

            </View>

    </ScrollView>
    </View>



    );
  }

  const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        height: Dimensions.get('window').height /1.9,
        width: Dimensions.get('window').width,
        marginBottom: 30
      },
      page: {
        justifyContent: 'center',
        alignItems: 'center',

      },


  button: {
      alignItems: "center",
      padding: 10,
      borderRadius: 5,
      marginTop: 50

    },
    button1: {
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginTop: 30

      },
      border_view:{
        backgroundColor: '#85e0e0',
        // distance of each cell
        padding: 30,
        //distance between each cell
        margin: 5,
        borderRadius: 25,
        textAlign: 'center',
        justifyContent: 'center',
      },

      steelblue: {
      color: "black",
      backgroundColor: "#85e0e0",
      fontSize: 18,
      padding: 13,
      fontWeight: 'bold',
      borderRadius: 10
    },
    steelblue1: {
    color: "black",
    backgroundColor: "#85e0e0",
    fontSize: 12,
    padding: 13,
    fontWeight: 'bold',
    borderRadius: 10
  },
    image: {
      paddingTop: 30,
      transform: [{ scale: 0.8 }],
      justifyContent: 'center',
      alignItems: 'center'

    },
    image1: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    label: {
      paddingBottom: 4
    },


    date_style: {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 110
        },


        container: {
    flex: 1  },

  });