import * as React from 'react';
import { useState, useMemo, useContext, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View, Alert, StyleSheet, TextInput, Linking, Image, ScrollView, SafeAreaView } from 'react-native';
import { logToConsole } from 'react-native/Libraries/Utilities/RCTLog';

export default function ChatBotScreen() {

  const [shouldShowMH, setShouldShowMH] = useState(false);
  const [shouldShowGH, setShouldShowGH] = useState(false);
  const [shouldShowCS, setShouldShowCS] = useState(false);
  const [shouldShowCA, setShouldShowCA] = useState(false);
  const [shouldShowSE, setShouldShowSE] = useState(false);
  const [shouldShowMain, setShouldShowMain] = useState(true);
  const [shouldShowOK, setShouldShowOK] = useState(false);
  const [shouldShowHappy, setShouldShowHappy] = useState(false);

  const onClickMH = () => {
    setShouldShowMH(!shouldShowMH);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  };

  const onClickGH = () => {
    setShouldShowMH(false);
    setShouldShowGH(!shouldShowGH);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  };

  const onClickCS = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(!shouldShowCS);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  }

  const onClickCA = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(!shouldShowCA);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  }

  const onClickSE = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(!shouldShowSE);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  }

  const onClickMain = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(true);
    setShouldShowOK(false);
    setShouldShowHappy(false);
  }

  const onClickOK = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(!shouldShowOK);
    setShouldShowHappy(false);
  }

  const onClickHappy = () => {
    setShouldShowMH(false);
    setShouldShowGH(false);
    setShouldShowCS(false);
    setShouldShowCA(false);
    setShouldShowSE(false);
    setShouldShowMain(false);
    setShouldShowOK(false);
    setShouldShowHappy(!shouldShowHappy);
  }

  const counselingAlert = () =>
    Alert.alert(
      "Counseling",
      "Services are confidential and include individual. NOTE: This is for NON-Emergency  situations.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: 'OK', onPress: () => Linking.openURL('https://www.csuohio.edu/counselingcenter/counselingcenter') }
      ]
    );

  const CAREAlert = () =>
    Alert.alert(
      "CARE CSU",
      "CARE is not Counseling or emergency response. CARE can, however, address every concern otherwise... They are great!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: 'OK', onPress: () => Linking.openURL('https://www.csuohio.edu/care/meet-care-management-team') }
      ]
    );

  const VCAlert = () =>
    Alert.alert(
      "Vikes Connect",
      "Vikes Connect has EVERY campus wide event. You can also find EVERY CSU organization!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: 'OK', onPress: () => Linking.openURL('https://vikesconnect.csuohio.edu/') }
      ]
    );

  const RecAlert = () =>
    Alert.alert(
      "CSU REcreation Center",
      "The Recreation Center hours are M-Th 5:45AM - 10PM\nnext",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: 'OK', onPress: () => Linking.openURL('https://www.csuohio.edu/recreationcenter/recreationcenter') }
      ]
    );

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        {
          shouldShowMain ? (
            <View style={styles.container}>
              <View style={styles.row}>
                <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                <Text style={styles.text}>  Hi there! How may I help you?  </Text>
              </View>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={onClickMH}
                    >
                  <Text style={{ color: "white" }}>Mental Health</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={onClickGH}>
                  <Text style={{ color: "white" }}>General Health</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={onClickCS}>
                  <Text style={{ color: "white" }}>Course Support</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={onClickCA}>
                  <Text style={{ color: "white" }}>Career Advice</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={onClickSE}>
                  <Text style={{ color: "white" }}>Socials</Text>
                </TouchableOpacity>

            </View>
          ) : null
        }

                                            {/* -->MENTAL HEALTH*/}

        {
              shouldShowMH ? (

                <View style={styles.container}>
                  <View style={styles.row}>
                    <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                    <Text style={styles.text}>  How are we feeling today?  </Text>
                  </View>

                    <TouchableOpacity
                      style={styles.SadButtons}
                      onPress={onClickOK}
                        >
                      <Text style={{ color: "white" }}>Sad</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.OkayButtons}
                      onPress={onClickOK}
                        >
                      <Text style={{ color: "white" }}>Okay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.HappyButtons}
                      onPress={onClickHappy}
                        >
                      <Text style={{ color: "white" }}>Happy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.AmazingButton}
                      onPress={onClickHappy}
                        >
                      <Text style={{ color: "white" }}>Amazing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttons}
                      onPress={onClickMain}
                    >
                      <Text style={{ color: "white" }}>Back to Main</Text>
                    </TouchableOpacity>
                  </View>
              ) : null
            }

                                      {/* -->MENTAL HEALTH--> SAD && OK*/}


                                      {
                                        shouldShowOK ? (

                                          <View style={styles.container}>
                                            <View style={styles.row}>
                                              <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                                              <Text style={styles.text}>  It is okay to ask for help. You never have to do this alone. </Text>
                                            </View>
                                            <View style={styles.row}>
                                              <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                                              <Text style={styles.text}>  If you feel like you need it, we can reach out together? </Text>
                                            </View>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={counselingAlert}
                                              >
                                                <Text style={{ color: "white" }}>Counseling</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                 onPress={CAREAlert}
                                              >
                                                <Text style={{ color: "white" }}>CARE Support</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.csuohio.edu/sites/default/files/ReachOut.pdf')}
                                              >
                                                <Text style={{ color: "white" }}>Reach Out</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickMain}
                                              >
                                                <Text style={{ color: "white" }}>Back to Main</Text>
                                              </TouchableOpacity>

                                          </View>
                                        ) : null
                                      }

                                      {/* -->MENTAL HEALTH--> HAPPY && AMAZING*/}

                                      {
                                        shouldShowHappy ? (

                                          <View style={styles.container}>
                                            <View style={styles.row}>
                                              <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                                              <Text style={styles.text}>  Nice! Shall We go to a social event? What do you like to do?  </Text>
                                            </View>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickSE}
                                              >
                                                <Text style={{ color: "white" }}>Social</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickGH}
                                              >
                                                <Text style={{ color: "white" }}>Healthy Living</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickCA}
                                              >
                                                <Text style={{ color: "white" }}>Job Search</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickMain}
                                              >
                                                <Text style={{ color: "white" }}>Back to Main</Text>
                                              </TouchableOpacity>
                                          </View>

                                        ) : null
                                      }

                                      {
                                        shouldShowGH ? (

                                            <View style={styles.container}>
                                              <View style={styles.row}>
                                                <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                                                <Text style={styles.text}>  Here you go! What were you thinking? </Text>
                                              </View>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickSE}
                                              >
                                                <Text style={{ color: "white" }}>Social Events</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.csuohio.edu/recreationcenter/hours')}
                                              >
                                                <Text style={{ color: "white" }}>Recreation Center</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.myplate.gov/')}
                                              >
                                                <Text style={{ color: "white" }}>Healthy Eating</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickMain}
                                              >
                                                <Text style={{ color: "white" }}>Back to Main</Text>
                                              </TouchableOpacity>
                                        </View>
                                      ) : null
                                    }


                                      {/* -->Course Support*/}

                      {
                        shouldShowCS ? (
                          <View style={styles.container}>
                            <View style={styles.row}>
                              <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                              <Text style={styles.text}>  Is this what you are looking for?  </Text>
                            </View>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://sciences.csuohio.edu/mathematics/math-learning-center')}
                                              >
                                                <Text style={{ color: "white" }}>Math</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.csuohio.edu/tutoring/tutoring-1')}
                                              >
                                                <Text style={{ color: "white" }}>Tutoring</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.csuohio.edu/tutoring/success-coaching')}
                                              >
                                                <Text style={{ color: "white" }}>Success Coaching</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={() => Linking.openURL('https://www.csuohio.edu/writing-center/writing-center')}
                                              >
                                                <Text style={{ color: "white" }}>Writing</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity
                                                style={styles.buttons}
                                                onPress={onClickMain}
                                              >
                                                <Text style={{ color: "white" }}>Back to Main</Text>
                                              </TouchableOpacity>
                </View>
              ) : null
            }

                                {/* -->CAREER ADVICE*/}

            {
              shouldShowCA ? (
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                    <Text style={styles.text}>  Is this what you are looking for?  </Text>
                  </View>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://www.clestatecareers.com/career-planning-coaching')}
              >
                <Text style={{ color: "white" }}>Career Advising and Coaching</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://csuohio.joinhandshake.com/login?ref=app-domain')}
              >
                <Text style={{ color: "white" }}>FInd Jobs or Internships</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://www.clestatecareers.com/events')}
              >
                <Text style={{ color: "white" }}>Career Workshops</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={onClickMain}
              >
                <Text style={{ color: "white" }}>Back to Main</Text>
              </TouchableOpacity>

                </View>
              ) : null
            }

                                  {/* -->SOCIALS*/}

            {
              shouldShowSE ? (
                <View style={styles.container}>
                  <View style={styles.row}>
                    <Image style={styles.imageStyle2} source={require('../assets/chatbot.png')} />
                    <Text style={styles.text}>  What would you like to do?  </Text>
                  </View>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://vikesconnect.csuohio.edu/events')}
              >
                <Text style={{ color: "white" }}>Social Events</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://vikesconnect.csuohio.edu/organizations')}
              >
                <Text style={{ color: "white" }}>Join an Organization</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => Linking.openURL('https://vikesconnect.csuohio.edu/organizations')}
              >
                <Text style={{ color: "white" }}>Go Greek</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={onClickMain}
              >
                <Text style={{ color: "white" }}>Back to Main</Text>
              </TouchableOpacity>
            </View>
              ) : null
            }

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width : 300,
    marginTop:  50,
    marginLeft: 10,
  },
  imageStyle2: {
    height: 60,
    width: 50,
    alignSelf: 'flex-start',
    marginLeft: -25,
    marginTop: -25,
    position: 'absolute',
    // alignItems: 'center',
  },
  buttons: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#85e0e0",
    padding: 10,
    borderRadius: 5,
    marginTop: 6,
    marginRight: 3,
    width: 150
  },
  SadButtons: {
    alignItems: "center",
    backgroundColor: "#add8e6",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
    marginRight: 3,
    width: 150
  },
  OkayButtons: {
    alignItems: "center",
    backgroundColor: "#4169e1",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
    marginRight: 3,
    width: 150
  },
  HappyButtons: {
    alignItems: "center",
    backgroundColor: "#ba55d3",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
    marginRight: 3,
    width: 150
  },
  AmazingButton: {
    alignItems: "center",
    backgroundColor: "#ff00ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
    marginRight: 3,
    width: 150
  },
  mainButtons: {
    marginVertical: 7,
    marginLeft: 60,
    borderRadius: 10,
    color: "#85e0e0",
    alignItems: 'stretch',
    textAlign: 'center'
  },
  text: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 10,
    backgroundColor: "#eaeaea",
    color: "#000000",
    textAlign: "center",
    justifyContent: 'center',
    fontSize: 18,
    height: 50,
  },
  textStyle: {
    fontSize: 28,
    textAlign: 'center',
    color: 'red',
    padding: 10
  },
});