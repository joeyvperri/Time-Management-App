import * as React from "react";
import {useContext, useEffect, useState, useLayoutEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Component,
  Systrace,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Share,
  Platform
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as SQLite from "expo-sqlite";
import {getDefaultLocale} from "react-datepicker";
import { te } from "date-fns/locale";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {}
        };
      }
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default function Results() {
  const createTwoButtonAlert = () =>
    Alert.alert("You are halfway there!", "Keep it up!", [
      {text: "OK", onPress: () => console.log("OK Pressed")}
    ]);

  const createTwoButtonAlert1 = () =>
    Alert.alert("You are almost done!", "Remember what you are working for!", [
      {text: "OK", onPress: () => console.log("OK Pressed")}
    ]);

  const createTwoButtonAlert2 = () =>
    Alert.alert(
      "You Finshed!",
      "Great job, don't forget to schedule for tomorrow!",
      [{text: "OK", onPress: () => console.log("OK Pressed")}]
    );

  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [freeTimeHours, setfreeTimeHours] = React.useState(0);
  const [homeworkHours, sethomeworkHours] = React.useState(0);
  const [sleepHours, setsleepHours] = React.useState(0);
  const [studyingHours, setstudyingHours] = React.useState(0);
  const [commutingHours, setcommutingHours] = React.useState(0);

  const [fdatee, setfdatee] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const [val, setVal] = useState();


  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      (tempDate.getDate()) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes;
    setText(fDate + "\n" + fTime);
    setfdatee(fDate);
    console.log(fdatee);
    console.log(fDate + " (" + fTime + ")");
  };

  //below prevents crashing on opening screen before entering any data
  //defaults to zero for everything :)
  var dummyData = [
    {
      name: "Free Time",
      Time: freeTimeHours,
      color: "purple",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Homework",
      Time: homeworkHours,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Sleep",
      Time: sleepHours,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Studying",
      Time: studyingHours,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Commuting",
      Time: commutingHours,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const [actualFreeTimeHours, setactualFreeTimeHours] = React.useState(0);
  const [actualHomeworkHours, setactualHomeworkHours] = React.useState(0);
  const [actualSleepHours, setactualSleepHours] = React.useState(0);
  const [actualStudyingHours, setactualStudyingHours] = React.useState(0);
  const [actualCommutingHours, setactualCommutingHours] = React.useState(0);

  const [saveScore, setSaveScore] = React.useState(0);

  const retrieveData = (
    fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours,
    actualFreeTimeHours,
    actualHomeworkHours,
    actualSleepHours,
    actualStudyingHours,
    actualCommutingHours,
    saveScore
  ) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM items where datee = ?",
          [fdatee],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              var ftHours = results.rows.item(0).freeTimeHours;
              var hwHours = results.rows.item(0).homeworkHours;
              var slpHours = results.rows.item(0).sleepHours;
              var stdyHours = results.rows.item(0).studyingHours;
              var cmmtHours = results.rows.item(0).commutingHours;

              var aftHours = results.rows.item(0).actualFreeTimeHours;
              var ahwHours = results.rows.item(0).actualHomeworkHours;
              var aslpHours = results.rows.item(0).actualSleepHours;
              var astdyHours = results.rows.item(0).actualStudyingHours;
              var acmmtHours = results.rows.item(0).actualCommutingHours;

              var daScore = results.rows.item(0).saveScore;

              setfreeTimeHours(ftHours);
              sethomeworkHours(hwHours);
              setsleepHours(slpHours);
              setstudyingHours(stdyHours);
              setcommutingHours(cmmtHours);

              setactualFreeTimeHours(aftHours);
              setactualHomeworkHours(ahwHours);
              setactualSleepHours(aslpHours);
              setactualStudyingHours(astdyHours);
              setactualCommutingHours(acmmtHours);
              setSaveScore(daScore);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  var score =
    (actualFreeTimeHours +
      actualHomeworkHours +
      actualSleepHours +
      actualStudyingHours +
      actualCommutingHours) /
    (freeTimeHours +
      homeworkHours +
      sleepHours +
      studyingHours +
      commutingHours);
  var displayScore = parseFloat(score).toFixed(2) * 100;
  if (displayScore > 100){
    displayScore = 100;
  }


  const onShare = async () => {
    try {
    const result = await Share.share({
      message: 'My score on The Time Management App is already ' + displayScore + '%! What about yours?',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {

      }
    } else if (result.action === Share.dismissedAction) {

    }
    } catch (error) {
    alert(error.message);
    }
    };

  const updateData = (
    fdatee,
    actualFreeTimeHours,
    actualHomeworkHours,
    actualSleepHours,
    actualStudyingHours,
    actualCommutingHours
  ) => {
    try {
      console.log("maybe");
      db.transaction(async tx => {
        tx.executeSql(
          "UPDATE items SET actualFreeTimeHours = ? WHERE datee = ?",
          [actualFreeTimeHours, fdatee]
        );
      });

      db.transaction(async tx => {
        tx.executeSql(
          "UPDATE items SET actualHomeworkHours = ? WHERE datee = ?",
          [actualHomeworkHours, fdatee]
        );
      });

      db.transaction(async tx => {
        tx.executeSql("UPDATE items SET actualSleepHours = ? WHERE datee = ?", [
          actualSleepHours,
          fdatee
        ]);
      });

      db.transaction(async tx => {
        tx.executeSql(
          "UPDATE items SET actualStudyingHours = ? WHERE datee = ?",
          [actualStudyingHours, fdatee]
        );
      });

      db.transaction(async tx => {
        tx.executeSql(
          "UPDATE items SET actualCommutingHours = ? WHERE datee = ?",
          [actualCommutingHours, fdatee]
        );
      });

      db.transaction(async tx => {
        tx.executeSql("UPDATE items SET saveScore = ? WHERE datee = ?", [
          displayScore,
          fdatee
        ]);
      });

      console.log(fdatee);
      console.log("pogg");
      db.transaction(tx => {
        tx.executeSql(
          "select * from items",
          [],
          (_, {rows}) => console.log(JSON.stringify(rows)),

          console.log("did it")
        );
      });

    } catch (error) {
      console.log(error);
    }

    if (displayScore == 100) {
      createTwoButtonAlert2();
    } else if (displayScore >= 80) {
      createTwoButtonAlert1();
    } else if (displayScore >= 50) {
      createTwoButtonAlert();
    }
  };

  var sleepdata = {
    data: [0.6]
  };

  if((actualFreeTimeHours / freeTimeHours) > 1) {

    var freedata = {
      data: [1 || 0]
    };
  }
  else {
    var freedata = {
      data: [actualFreeTimeHours / freeTimeHours || 0]
    };
  }


  if((actualHomeworkHours / homeworkHours) > 1) {

    var homeworkData = {
      data: [1 || 0]
    };
  }
  else {
    var homeworkData = {
      data: [actualHomeworkHours / homeworkHours || 0]
    };
  }



  if((actualSleepHours / sleepHours) > 1) {

    var sleepData2 = {
      data: [1 || 0]
    };
  }
  else {
    var sleepData2 = {
      data: [actualSleepHours / sleepHours || 0]
    };
  }

  if((actualStudyingHours / studyingHours) > 1) {

    var studyData = {
      data: [1 || 0]
    };
  }
  else {
    var studyData = {
      data: [actualStudyingHours / studyingHours || 0]
    };
  }


  if((actualCommutingHours / commutingHours) > 1) {

    var commutingData = {
      data: [1 || 0]
    };
  }
  else {
    var commutingData = {
      data: [actualCommutingHours / commutingHours || 0]
    };
  }

  var scoreData = {
    data: [
      (displayScore / 100) || 0
    ]
  };

  if (fdatee == "") {
    console.log("null");
    var today = new Date();

    let testDate =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
    setfdatee(testDate);

    console.log("end of if");
  }

  if (isNaN(displayScore)){
    displayScore = 0;
    retrieveData(
      fdatee,
      freeTimeHours,
      homeworkHours,
      sleepHours,
      studyingHours,
      commutingHours,
      actualFreeTimeHours,
      actualHomeworkHours,
      actualSleepHours,
      actualStudyingHours,
      actualCommutingHours
    );
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
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
            <View style={styles.rowers}>

            {(Platform.OS === 'android') ? (
              <TouchableOpacity
              style={styles.button}
              onPress={() => showMode("date")}
            >
              <Text style={styles.steelblue}>Pick Different Date!</Text>
            </TouchableOpacity>
             ): null}


              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  retrieveData(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours,
                    actualFreeTimeHours,
                    actualHomeworkHours,
                    actualSleepHours,
                    actualStudyingHours,
                    actualCommutingHours
                  )
                }
              >
                <Text style={styles.steelblue}>Load data!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datepickerview}>
              {(Platform.OS === 'ios') || show ?(
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  style={styles.datePicker}
                />
              ): null}
            </View>

            <View style={styles.border_view}>
              <Text style={styles.date_style}>Goals for: {fdatee}</Text>

              <PieChart
                data={dummyData}
                width={
                  Dimensions.get("window").width -
                  Dimensions.get("window").width / 5
                }
                height={160}
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
              />
            </View>

            <Text style={styles.date_style}>Progress:</Text>

            <View style={styles.rowers}>
              <View style={styles.border_view2}>
                <ProgressChart
                  data={freedata}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>Free time!</Text>
                  <TextInput
                    placeholderTextColor="white"
                    borderColor="purple"
                    style={styles.text_input}
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setactualFreeTimeHours(parseInt(value) || 0);
                      }
                    }}
                  />
                  <Text style={styles.labels}> out of {freeTimeHours}</Text>
                </View>
              </View>

              <View style={styles.border_view2}>
                <ProgressChart
                  data={homeworkData}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>Homework!</Text>
                  <TextInput
                    placeholderTextColor="white"
                    borderColor="green"
                    style={styles.text_input}
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setactualHomeworkHours(parseInt(value) || 0);
                      }
                    }}
                  />
                  <Text style={styles.labels}> out of {homeworkHours}</Text>
                </View>
              </View>
            </View>

            <View style={styles.rowers}>
              <View style={styles.border_view2}>
                <ProgressChart
                  data={sleepData2}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>Sleep!</Text>
                  <TextInput
                    placeholderTextColor="white"
                    borderColor="red"
                    style={styles.text_input}
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setactualSleepHours(parseInt(value) || 0);
                      }
                    }}
                  />
                  <Text style={styles.labels}> out of {sleepHours}</Text>
                </View>
              </View>
              <View style={styles.border_view2}>
                <ProgressChart
                  data={studyData}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>Studying!</Text>
                  <TextInput
                    placeholderTextColor="white"
                    borderColor="yellow"
                    style={styles.text_input}
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setactualStudyingHours(parseInt(value) || 0);
                      }
                    }}
                  />
                  <Text style={styles.labels}> out of {studyingHours}</Text>
                </View>
              </View>
            </View>

            <View style={styles.rowers}>
              <View style={styles.border_view2}>
                <ProgressChart
                  data={commutingData}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>Commuting!</Text>
                  <TextInput
                    placeholderTextColor="white"
                    borderColor="blue"
                    style={styles.text_input}
                    keyboardType="numeric"
                    onChangeText={value => {
                      {
                        setactualCommutingHours(parseInt(value) || 0);
                      }
                    }}
                  />
                  <Text style={styles.labels}> out of {commutingHours}</Text>
                </View>
              </View>
              <View style={styles.border_view2}>
                <ProgressChart
                  data={scoreData}
                  width={
                    Dimensions.get("window").width -
                    Dimensions.get("window").width / 2
                  }
                  height={90}
                  strokeWidth={16}
                  radius={32}
                  chartConfig={{
                    backgroundColor: "#85e0e0",
                    backgroundGradientFrom: "#85e0e0",
                    backgroundGradientTo: "#85e0e0",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(218, 165, 32, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  hideLegend={true}
                />

                <View style={styles.rowers}>
                  <Text style={styles.labels}>
                    Your Total Progress: {displayScore.toFixed(0)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {Platform.OS === 'ios' ? (
            <View style={{padding: 100}}/>
          ): null}

        </ScrollView>

        <View style={styles.rowers}>

        <TouchableOpacity style={styles.button1}
        onPress={() => updateData(fdatee, actualFreeTimeHours, actualHomeworkHours, actualSleepHours, actualStudyingHours, actualCommutingHours)}
        >
        <Text style={styles.steelblue1}>Save Data!</Text>

        </TouchableOpacity>


        <TouchableOpacity style={styles.button2}
        onPress={onShare}
        >
        <Text style={styles.steelblue1}>Share Score</Text>

        </TouchableOpacity>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 4,
    margin: 5,
    width: 200
  },

  text_input: {
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    padding: 4,
    width: 40,
    height: 45,
    marginLeft: 5
  },

  text_heading_header: {
    textAlign: "center"
  },

  border_view: {
    backgroundColor: "#85e0e0",
    // distance of each cell
    padding: 30,
    //distance between each cell
    margin: 5,
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center"
  },

  border_view2: {
    backgroundColor: "#85e0e0",
    // distance of each cell

    //distance between each cell
    margin: 1,
    paddingBottom: 8,
    paddingTop: 20,
    borderRadius: 20,
    textAlign: "center",
    justifyContent: "center"
  },
  labels: {
    marginTop: 11,
    color: "white"
  },

  rowers: {
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#85e0e0",
    padding: 10,
    borderRadius: 5,
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3
  },

  button1: {
    alignItems: "center",
    backgroundColor: "#7acfcf",
    padding: 10,
    width: Dimensions.get('window').width - (Dimensions.get('window').width / 5)
  },

  button2: {
    alignItems: "center",
    backgroundColor: "#7acfcf",
    width: (Dimensions.get('window').width / 5)
  },

  steelblue: {
    color: "white",
    fontSize: 15,
    padding: 5,
    fontWeight: "bold"
  },

  steelblue1: {
    color: "white",
    fontSize: 17,
    padding: 3,
    fontWeight: "bold"
  },

  date_style: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25
  },
  datePicker: {
    width: Dimensions.get("window").width,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  datepickerview: {
    justifyContent: "center"
  }
});