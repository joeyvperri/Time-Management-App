import * as React from "react";
import { useState, useMemo, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Component,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform, Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import NumericInput from "react-native-numeric-input";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { Children } from "react/cjs/react.production.min";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import { getDefaultLocale } from "react-datepicker";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from 'expo-notifications';

//function to open database
function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { }
        };
      }
    };
  }
  const db = SQLite.openDatabase("db.db");
  return db;
}

//open database here
const db = openDatabase();

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

//runs automatically
export default function Scheduling() {
  useEffect(() => {
    createTable();
  }, []);

  //creates table within database if it does not already exist
  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (datee TEXT primary key, freeTimeHours REAL, homeworkHours REAL, sleepHours REAL, studyingHours REAL, commutingHours REAL, actualFreeTimeHours REAL, actualHomeworkHours REAL, actualSleepHours REAL, actualStudyingHours REAL, actualCommutingHours REAL, saveScore REAL, year INTEGER, month INTEGER);"
      );
    });
    console.log("table created/already created");
  };

  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [freeTimeHours, setfreeTimeHours] = React.useState(0);
  const [homeworkHours, sethomeworkHours] = React.useState(0);
  const [sleepHours, setsleepHours] = React.useState(0);
  const [studyingHours, setstudyingHours] = React.useState(0);
  const [commutingHours, setcommutingHours] = React.useState(0);
  const [fdatee, setfdatee] = React.useState("");
  const [fyear, setfyear] = React.useState(0);
  const [fmonth, setfmonth] = React.useState(0);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const hoursLeft = (24.0 - freeTimeHours - homeworkHours - sleepHours - studyingHours - commutingHours);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes;
    setText(fDate + "\n" + fTime);
    setfdatee(fDate);
    setfyear(tempDate.getFullYear());
    setfmonth(tempDate.getMonth() + 1);
    console.log(fdatee);
    console.log(fDate + " (" + fTime + ")");
  };

  function SelfCareCheck(fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours){

      if((homeworkHours+studyingHours) > sleepHours){
        createAlertTOREST();
      }
      else if(freeTimeHours > studyingHours) {
        createAlertTOWORK();
      }
      else if (freeTimeHours == sleepHours) {
        createAlertTOHOBBY();
      }

  }

  
  const enterData = (
    fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours
  ) => {
    //Check to see if user inputted more hours than 24 first
    if (
      freeTimeHours +
      homeworkHours +
      sleepHours +
      studyingHours +
      commutingHours <=
      24
    ) {
      try {
        //Insert the hours they entered into the database, along with 0 for everything else
        db.transaction(async tx => {
          tx.executeSql(
            "INSERT INTO items (datee, freeTimeHours, homeworkHours, sleepHours, studyingHours, commutingHours, actualFreeTimeHours, actualHomeworkHours, actualSleepHours, actualStudyingHours, actualCommutingHours, saveScore, year, month) VALUES (?, ?, ?, ?, ?, ?, 0, 0, 0, 0, 0, 0, ?, ?)",
            [
              fdatee,
              freeTimeHours,
              homeworkHours,
              sleepHours,
              studyingHours,
              commutingHours,
              fyear,
              fmonth
            ]
          );
        });

        //update rows below, if user chooses to redo schedule
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET freeTimeHours = ? WHERE datee = ?", [
            freeTimeHours,
            fdatee
          ]);
        });
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET homeworkHours = ? WHERE datee = ?", [
            homeworkHours,
            fdatee
          ]);
        });
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET sleepHours = ? WHERE datee = ?", [
            sleepHours,
            fdatee
          ]);
        });
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET studyingHours = ? WHERE datee = ?", [
            studyingHours,
            fdatee
          ]);
        });
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET commutingHours = ? WHERE datee = ?", [
            commutingHours,
            fdatee
          ]);
        });
        db.transaction(async tx => {
          tx.executeSql(
            "UPDATE items SET actualFreeTimeHours = 0 WHERE datee = ?",
            [fdatee]
          );
        });
        db.transaction(async tx => {
          tx.executeSql(
            "UPDATE items SET actualHomeworkHours = 0 WHERE datee = ?",
            [fdatee]
          );
        });
        db.transaction(async tx => {
          tx.executeSql(
            "UPDATE items SET actualSleepHours = 0 WHERE datee = ?",
            [fdatee]
          );
        });
        db.transaction(async tx => {
          tx.executeSql(
            "UPDATE items SET actualStudyingHours = 0 WHERE datee = ?",
            [fdatee]
          );
        });
        db.transaction(async tx => {
          tx.executeSql(
            "UPDATE items SET actualCommutingHours = 0 WHERE datee = ?",
            [fdatee]
          );
        });
        db.transaction(async tx => {
          tx.executeSql("UPDATE items SET saveScore = 0 WHERE datee = ?", [
            fdatee
          ]);
        });
        //below we print the contents of our database table into the console
        db.transaction(tx => {
          tx.executeSql(
            "select * from items",
            [],
            (_, { rows }) => console.log(JSON.stringify(rows)),

            console.log("did it")
          );
        });
        createAlert1();
      } catch (error) {
        console.log(error);
      }
    } else {
      createAlert2();
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const data = [
    {
      name: "Free Time",
      Time: freeTimeHours || 0,
      color: "purple",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Homework",
      Time: homeworkHours || 0,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Sleep",
      Time: sleepHours || 0,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Studying",
      Time: studyingHours || 0,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Commuting",
      Time: commutingHours || 0,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const [submitted, setSubmitted] = useState(false);

  const onPressHandler = () => {
    setSubmitted(!submitted);
  };

  if (fdatee == "") {
    console.log("null");
    var today = new Date();

    let testDate =
      today.getMonth() +
      1 +
      "/" +
      (today.getDate() + 1) +
      "/" +
      today.getFullYear();
    setfdatee(testDate);
    setfyear(today.getFullYear());
    setfmonth(today.getMonth() + 1);

    console.log("end of if");
  }

  //alerts for when the user successfully submits their schedule or if they enter too many hours
  const createAlert1 = () =>
    Alert.alert("Success", "Schedule Entered!", [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  const createAlert2 = () =>
    Alert.alert("Error:", "Hours must be less than or equal to 24!", [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);


  const createAlertTOREST = () =>
    Alert.alert("Self-Care Check!", "Did you know that 52% of people feel burnt out by the end of the week?\nBe sure to make time for self care!", [
      { text: "Thanks!!", onPress: () => console.log("Needs to rest.") }
    ]);
  const createAlertTOWORK = () =>
    Alert.alert("Self-Care Check!", "Did you know that getting a job offer is a numbers game? Let's check out the resources in the support tab!", [
      { text: "Thanks!", onPress: () => console.log("Has free time.") }
    ]);
  const createAlertTOHOBBY = () =>
    Alert.alert("Self-Care Check!", "There are events every day of the week! Check out the Socials in the support tab! Someone said free stuff?!", [
      { text: "Thanks!", onPress: () => console.log("Time for a hobby.") }
    ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          height: 100
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View onStartShouldSetResponder={() => true}>
            <View
              style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Enter your schedule for this date:
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>{fdatee}</Text>

              {(Platform.OS === 'android') ? (
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => showMode("date")}
                >
                  <Text style={{ color: "white" }}>Pick a date</Text>
                </TouchableOpacity>
              ) : null}

              {(Platform.OS === 'ios') || show ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  style={styles.datePicker}
                />
              ) : null}
              <Text style={{ fontWeight: 'bold' }}>Hours Remaining: {hoursLeft}</Text>
              <View style={styles.border_view}>
                <View style={styles.row}>
                  <Image style={styles.imageStyle} source={require('../assets/home.png')} />
                  <TextInput
                    style={styles.input}
                    placeholder="Free Time Hours"
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setfreeTimeHours(parseInt(value) || 0);
                      }
                    }}
                  />
                </View>

                <View style={styles.row}>
                  <Image style={styles.imageStyle} source={require('../assets/pencil.png')} />
                  <TextInput style={styles.input}
                    placeholder='Homework Hours'
                    keyboardType='numeric'
                    onChangeText={(value) => { { sethomeworkHours(parseInt(value) || 0) } }} />
                </View>

                <View style={styles.row}>
                  <Image style={styles.imageStyle} source={require('../assets/alarm.png')} />
                  <TextInput style={styles.input}
                    placeholder='Sleep Hours'
                    keyboardType='numeric'
                    onChangeText={(value) => { { setsleepHours(parseInt(value) || 0) } }} />
                </View>

                <View style={styles.row}>
                  <Image style={styles.imageStyle} source={require('../assets/notebook.png')} />
                  <TextInput style={styles.input}
                    placeholder='Studying Hours'
                    keyboardType='numeric'
                    onChangeText={(value) => { { setstudyingHours(parseInt(value) || 0) } }} />
                </View>


                <View style={styles.row}>
                  <Image style={styles.imageStyle} source={require('../assets/map.png')} />
                  <TextInput style={styles.input}
                    placeholder='Commuting Hours'
                    keyboardType='numeric'
                    onChangeText={(value) => { { setcommutingHours(parseInt(value) || 0) } }} />
                </View>
              </View>
              <TouchableOpacity
                style={styles.button1}
                themeType="raised"
                onPress={() => {
                  enterData(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours
                  ); SelfCareCheck(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours
                  );}
                }
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </TouchableOpacity>

              <PieChart
                data={data}
                width={Dimensions.get("window").width}
                height={200}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                accessor="Time"
                backgroundColor="transparent"
                paddingLeft="15"
              />

		<View style={styles.row}>
          <TouchableOpacity
                   style={styles.button1}
                    onPress={async () => {
                      await schedulePushNotification();
                      }}
                    >
                <Text style={{color: "white"}}> Get Daily Reminders </Text>
            </TouchableOpacity>

              <TouchableOpacity
                    style={styles.button1}
                    onPress={async () => {
                      await Notifications.cancelAllScheduledNotificationsAsync();
                      }}
                    >
                     <Text style={{color: "white"}}> Cancel Daily Reminders </Text>

                    </TouchableOpacity>
          </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 25,
    padding: 4,
    margin: 5,
    width: 200,
    justifyContent: 'center',
    textAlign: 'center',
  },
  border_view: {
    backgroundColor: "#85e0e0",
    // distance of each cell
    paddingRight: 30,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    //distance between each cell
    margin: 5,
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center"
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#7acfcf",
    padding: 10,
    borderRadius: 5
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  imageStyle: {
    margin: 9.5,
    height: 27,
    width: 28,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});


//We initialize the handler to take care of Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    null
  );
}

//Notification content and trigger

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Schedule out your day!",
      body: "Don't forget to schedule your hours today!",
    },
    trigger: {
      /*  type: 'daily';
          hour: 12;
          minute: 01;*/
      seconds:3

    },
  });
}

//Ask for permissions
//Android will typically just use the default
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: true,
      lightColor: "#FF231F7C",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: true,
    });
  }

  return token;
}