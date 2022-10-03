import * as React from "react";
import {useContext, useEffect, useState, useRef} from "react";
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
  TouchableOpacity
} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import {dataContext} from "./SchedulingScreen";
// import { AppContext } from '../context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SQLite from "expo-sqlite";
import {getDefaultLocale} from "react-datepicker";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import {SafeAreaView} from "react-native-safe-area-context";
import {Picker} from "@react-native-picker/picker";
import { LogBox } from 'react-native';


//func to open database 
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

export default function History() {

  useEffect(() => {
  }, [])

  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [freeTimeHours, setfreeTimeHours] = React.useState(0);
  const [homeworkHours, sethomeworkHours] = React.useState(0);
  const [sleepHours, setsleepHours] = React.useState(0);
  const [studyingHours, setstudyingHours] = React.useState(0);
  const [commutingHours, setcommutingHours] = React.useState(0);

  const [actualFreeTimeHours, setactualFreeTimeHours] = React.useState(0);
  const [actualHomeworkHours, setactualHomeworkHours] = React.useState(0);
  const [actualSleepHours, setactualSleepHours] = React.useState(0);
  const [actualStudyingHours, setactualStudyingHours] = React.useState(0);
  const [actualCommutingHours, setactualCommutingHours] = React.useState(0);

  const [yearlyfreeTimeHours, setyearlyfreeTimeHours] = React.useState(0);
  const [yearlyhomeworkHours, setyearlyhomeworkHours] = React.useState(0);
  const [yearlysleepHours, setyearlysleepHours] = React.useState(0);
  const [yearlystudyingHours, setyearlystudyingHours] = React.useState(0);
  const [yearlycommutingHours, setyearlycommutingHours] = React.useState(0);

  const [actualyearlyFreeTimeHours, setactualyearlyFreeTimeHours] = React.useState(0);
  const [actualyearlyHomeworkHours, setactualyearlyHomeworkHours] = React.useState(0);
  const [actualyearlySleepHours, setactualyearlySleepHours] = React.useState(0);
  const [actualyearlyStudyingHours, setactualyearlyStudyingHours] = React.useState(0);
  const [actualyearlyCommutingHours, setactualyearlyCommutingHours] = React.useState(0);

  const [monthlyfreeTimeHours, setmonthlyfreeTimeHours] = React.useState(0);
  const [monthlyhomeworkHours, setmonthlyhomeworkHours] = React.useState(0);
  const [monthlysleepHours, setmonthlysleepHours] = React.useState(0);
  const [monthlystudyingHours, setmonthlystudyingHours] = React.useState(0);
  const [monthlycommutingHours, setmonthlycommutingHours] = React.useState(0);

  const [actualmonthlyFreeTimeHours, setactualmonthlyFreeTimeHours] = React.useState(0);
  const [actualmonthlyHomeworkHours,setactualmonthlyHomeworkHours] = React.useState(0);
  const [actualmonthlySleepHours, setactualmonthlySleepHours] = React.useState(0);
  const [actualmonthlyStudyingHours, setactualmonthlyStudyingHours] = React.useState(0);
  const [actualmonthlyCommutingHours, setactualmonthlyCommutingHours] = React.useState(0);

  const [saveScore, setSaveScore] = React.useState(0);

  const [fdatee, setfdatee] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

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
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes;
    setText(fDate + "\n" + fTime);
    setfdatee(fDate);
    console.log(fdatee);
    console.log(fDate + " (" + fTime + ")");
  };

 //data below for line chart
  const data = {
    labels: ["Free time", "Homework", "Sleep", "Study", "Commuting"],
    datasets: [
      {
        data: [
          freeTimeHours,
          homeworkHours,
          sleepHours,
          studyingHours,
          commutingHours
        ],
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1 // optional
      },
      {
        data: [
          actualFreeTimeHours,
          actualHomeworkHours,
          actualSleepHours,
          actualStudyingHours,
          actualCommutingHours
        ],
        strokeWidth: 1 // optional
      }
    ],
    legend: ["Scheduled Hours", "Completed Hours"] // optional
  };

  //data below for yearly line chart
  const yearlydata = {
    labels: ["Free time", "Homework", "Sleep", "Study", "Commuting"],
    datasets: [
      {
        data: [
          yearlyfreeTimeHours,
          yearlyhomeworkHours,
          yearlysleepHours,
          yearlystudyingHours,
          yearlycommutingHours
        ],
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1 // optional
      },
      {
        data: [
          actualyearlyFreeTimeHours,
          actualyearlyHomeworkHours,
          actualyearlySleepHours,
          actualyearlyStudyingHours,
          actualyearlyCommutingHours
        ],
        strokeWidth: 1 // optional
      }
    ],
    legend: ["Scheduled Hours", "Completed Hours"] // optional
  };

  //data below for monthly line chart
  const monthlydata = {
    labels: ["Free time", "Homework", "Sleep", "Study", "Commuting"],
    datasets: [
      {
        data: [
          monthlyfreeTimeHours,
          monthlyhomeworkHours,
          monthlysleepHours,
          monthlystudyingHours,
          monthlycommutingHours
        ],
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 1 // optional
      },
      {
        data: [
          actualmonthlyFreeTimeHours,
          actualmonthlyHomeworkHours,
          actualmonthlySleepHours,
          actualmonthlyStudyingHours,
          actualmonthlyCommutingHours
        ],
        strokeWidth: 1 // optional
      }
    ],
    legend: ["Scheduled Hours", "Completed Hours"] // optional
  };



  useEffect(() => {}, []);
  //these are used to only display one of the views at a time, so user can only have daily, monthly, or yearly data open
  const onClickDay = () => {
    setShouldShowDay(!shouldShowDay);
    setShouldShowMonth(false);
    setShouldShowYear(false);
  };

  const onClickMonth = () => {
    setShouldShowMonth(!shouldShowMonth);
    setShouldShowDay(false);
    setShouldShowYear(false);
  };
  const onClickYear = () => {
    setShouldShowYear(!shouldShowYear);
    setShouldShowMonth(false);
    setShouldShowDay(false);
  };

  const retrieveData = (
    fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours
  ) => {
    try {
      console.log("Retrieved data");
      console.log(fdatee);
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
              
            }
            else{
              setfreeTimeHours(0);
              sethomeworkHours(0);
              setsleepHours(0);
              setstudyingHours(0);
              setcommutingHours(0);

              setactualFreeTimeHours(0);
              setactualHomeworkHours(0);
              setactualSleepHours(0);
              setactualStudyingHours(0);
              setactualCommutingHours(0);
              setSaveScore(0);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
//here we retrieve the monthly data
  const retrieveMonthData = (
    fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours,
    fmonthlydatayear,
    fmonthlydatamonth
  ) => {
    try {
      var i = 0;
      console.log("Retrieved data");
      db.transaction(tx => {
        tx.executeSql(
          //get all rows where the year and month equal the ones the user picked
          "SELECT * FROM items where year = ? AND month = ?",
          [fmonthlydatayear, fmonthlydatamonth],
          (tx, results) => {
            //len equal to the number of rows that meet those criteria
            var len = results.rows.length;
            //set these to 0
            setmonthlyfreeTimeHours(0);
            setmonthlyhomeworkHours(0);
            setmonthlysleepHours(0);
            setmonthlystudyingHours(0);
            setmonthlycommutingHours(0);

            setactualmonthlyFreeTimeHours(0);
            setactualmonthlyHomeworkHours(0);
            setactualmonthlySleepHours(0);
            setactualmonthlyStudyingHours(0);
            setactualmonthlyCommutingHours(0);
            
            if (len > 0) {
              var tempft = 0;
              var temphw = 0;
              var tempslp = 0;
              var tempstdy = 0;
              var tempcmmt = 0;

              var atempft = 0;
              var atemphw = 0;
              var atempslp = 0;
              var atempstdy = 0;
              var atempcmmt = 0;
              while (i < len) {
                //adding all the hours from each row in this loop
                var ftHours = results.rows.item(i).freeTimeHours;
                var hwHours = results.rows.item(i).homeworkHours;
                var slpHours = results.rows.item(i).sleepHours;
                var stdyHours = results.rows.item(i).studyingHours;
                var cmmtHours = results.rows.item(i).commutingHours;

                var aftHours = results.rows.item(i).actualFreeTimeHours;
                var ahwHours = results.rows.item(i).actualHomeworkHours;
                var aslpHours = results.rows.item(i).actualSleepHours;
                var astdyHours = results.rows.item(i).actualStudyingHours;
                var acmmtHours = results.rows.item(i).actualCommutingHours;

                tempft += ftHours;
                temphw += hwHours;
                tempslp += slpHours;
                tempstdy += stdyHours;
                tempcmmt += cmmtHours;

                atempft += aftHours;
                atemphw += ahwHours;
                atempslp += aslpHours;
                atempstdy += astdyHours;
                atempcmmt += acmmtHours;

                i = i + 1;
              }
              //then set the data thats actually used in the visuals
              setmonthlyfreeTimeHours(tempft);
              setmonthlyhomeworkHours(temphw);
              setmonthlysleepHours(tempslp);
              setmonthlystudyingHours(tempstdy);
              setmonthlycommutingHours(tempcmmt);

              setactualmonthlyFreeTimeHours(atempft);
              setactualmonthlyHomeworkHours(atemphw);
              setactualmonthlySleepHours(atempslp);
              setactualmonthlyStudyingHours(atempstdy);
              setactualmonthlyCommutingHours(atempcmmt);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //same concept as retrieveMonthlyData
  const retrieveYearData = (
    fdatee,
    freeTimeHours,
    homeworkHours,
    sleepHours,
    studyingHours,
    commutingHours,
    fyeartemp
  ) => {
    try {
      var i = 0;
      console.log("Retrieved data");
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM items where year = ?",
          [fyeartemp],
          (tx, results) => {
            var len = results.rows.length;
            setyearlyfreeTimeHours(0);
            setyearlyhomeworkHours(0);
            setyearlysleepHours(0);
            setyearlystudyingHours(0);
            setyearlycommutingHours(0);

            setactualyearlyFreeTimeHours(0);
            setactualyearlyHomeworkHours(0);
            setactualyearlySleepHours(0);
            setactualyearlyStudyingHours(0);
            setactualyearlyCommutingHours(0);

            if (len > 0) {
              var tempft = 0;
              var temphw = 0;
              var tempslp = 0;
              var tempstdy = 0;
              var tempcmmt = 0;

              var atempft = 0;
              var atemphw = 0;
              var atempslp = 0;
              var atempstdy = 0;
              var atempcmmt = 0;
              while (i < len) {
                var ftHours = results.rows.item(i).freeTimeHours;
                var hwHours = results.rows.item(i).homeworkHours;
                var slpHours = results.rows.item(i).sleepHours;
                var stdyHours = results.rows.item(i).studyingHours;
                var cmmtHours = results.rows.item(i).commutingHours;

                var aftHours = results.rows.item(i).actualFreeTimeHours;
                var ahwHours = results.rows.item(i).actualHomeworkHours;
                var aslpHours = results.rows.item(i).actualSleepHours;
                var astdyHours = results.rows.item(i).actualStudyingHours;
                var acmmtHours = results.rows.item(i).actualCommutingHours;

                tempft += ftHours;
                temphw += hwHours;
                tempslp += slpHours;
                tempstdy += stdyHours;
                tempcmmt += cmmtHours;

                atempft += aftHours;
                atemphw += ahwHours;
                atempslp += aslpHours;
                atempstdy += astdyHours;
                atempcmmt += acmmtHours;

                i = i + 1;
              }
              setyearlyfreeTimeHours(tempft);
              setyearlyhomeworkHours(temphw);
              setyearlysleepHours(tempslp);
              setyearlystudyingHours(tempstdy);
              setyearlycommutingHours(tempcmmt);

              setactualyearlyFreeTimeHours(atempft);
              setactualyearlyHomeworkHours(atemphw);
              setactualyearlySleepHours(atempslp);
              setactualyearlyStudyingHours(atempstdy);
              setactualyearlyCommutingHours(atempcmmt);
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  //progress bar calculations below
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
  if (isNaN(displayScore)) {
    displayScore = 0;
  }
//yearly
  var yearlyscore =
    (actualyearlyFreeTimeHours +
      actualyearlyHomeworkHours +
      actualyearlySleepHours +
      actualyearlyStudyingHours +
      actualyearlyCommutingHours) /
    (yearlyfreeTimeHours +
      yearlyhomeworkHours +
      yearlysleepHours +
      yearlystudyingHours +
      yearlycommutingHours);
  var yearlydisplayScore = parseFloat(yearlyscore).toFixed(2) * 100;
  if (isNaN(yearlydisplayScore)) {
    yearlydisplayScore = 0;
  }
//monthly
  var monthlyscore =
    (actualmonthlyFreeTimeHours +
      actualmonthlyHomeworkHours +
      actualmonthlySleepHours +
      actualmonthlyStudyingHours +
      actualmonthlyCommutingHours) /
    (monthlyfreeTimeHours +
      monthlyhomeworkHours +
      monthlysleepHours +
      monthlystudyingHours +
      monthlycommutingHours);
  var monthlydisplayScore = parseFloat(monthlyscore).toFixed(2) * 100;
  if (isNaN(monthlydisplayScore)) {
    monthlydisplayScore = 0;
  }

  const [shouldShowDay, setShouldShowDay] = useState(false);
  const [shouldShowMonth, setShouldShowMonth] = useState(false);
  const [shouldShowYear, setShouldShowYear] = useState(false);
  const [fyeartemp, setfyeartemp] = useState(0);
  const [fmonthlydatayear, setfmonthlydatayear] = useState(0);
  const [fmonthlydatamonth, setfmonthlydatamonth] = useState(0);

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center', justifyContent: 'center'}}>Show Data By:</Text>

      <View style={styles.rowers}>
        <View style={{paddingRight: 2}} />
        <TouchableOpacity
          style={styles.button1}
          themeType="raised"
          onPress={onClickDay}
        >
          <Text style={{color: "white"}}>Day</Text>
        </TouchableOpacity>
        <View style={{paddingRight: 2}} />
        <TouchableOpacity
          style={styles.button1}
          themeType="raised"
          onPress={onClickMonth}
        >
          <Text style={{color: "white"}}>Month</Text>
        </TouchableOpacity>
        <View style={{paddingRight: 2}} />
        <TouchableOpacity
          style={styles.button1}
          themeType="raised"
          onPress={onClickYear}
        >
          <Text style={{color: "white"}}>Year</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 2}}/>

      <View style={styles.rowers}>
        {shouldShowDay ? (
          <ScrollView style={{flex: 1}}>
            <View style={{padding: 2}} />
            <Text
              style={{fontWeight: "bold", textAlign: "center", fontSize: 24}}
            >
              Daily Data
            </Text>
            <View style={{padding: 2}} />
            <View style={styles.rowers}>
            {(Platform.OS === 'android') ? (
             <TouchableOpacity
             style={styles.button1}
             onPress={() => showMode("date")}
           >
             <Text style={{color: "white"}}>Pick a date</Text>
           </TouchableOpacity>
             ): null}


              <View style={{paddingRight: 2}} />

              <TouchableOpacity
                style={styles.button1}
                themeType="raised"
                onPress={() =>
                  retrieveData(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours
                  )
                }
              >
                <Text style={{color: "white"}}>Submit</Text>
              </TouchableOpacity>
            </View>
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
            <Text style={styles.date_style}>{fdatee}</Text>
            <View style={styles.border_view}>
              <LineChart
                data={data}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
              />
            </View>

            <View style={{padding: 10}} />

            <View style={styles.border_view}>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text> </Text>
                <Text style={styles.tables_hours}> Scheduled:</Text>
                <Text style={styles.tables_hours}> Completed:</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Freetime </Text>
                <Text style={styles.tables_hours}>{freeTimeHours} </Text>
                <Text style={styles.tables_hours}>{actualFreeTimeHours} </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Homework </Text>
                <Text style={styles.tables_hours}> {homeworkHours} </Text>
                <Text style={styles.tables_hours}> {actualHomeworkHours} </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Sleep </Text>
                <Text style={styles.tables_hours}> {sleepHours} </Text>
                <Text style={styles.tables_hours}> {actualSleepHours} </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Studying </Text>
                <Text style={styles.tables_hours}> {studyingHours} </Text>
                <Text style={styles.tables_hours}> {actualStudyingHours} </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Commuting </Text>
                <Text style={styles.tables_hours}> {commutingHours} </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualCommutingHours}{" "}
                </Text>
              </View>
            </View>
            <View style={{paddingTop: 40}}>
              <Text style={styles.score_header}>Overall Progress: {displayScore.toFixed(0)}% </Text>
              <ProgressBarAnimated
                width={Dimensions.get("window").width}
                value={displayScore}
                backgroundColor="#FF0000"
                backgroundColorOnComplete="#32CD32"
              />
              
              <View style={{paddingTop: 40}}></View>
            </View>
          </ScrollView>
        ) : null}
      </View>

      <View style={styles.rowers}>
        {shouldShowMonth ? (
          <ScrollView style={{flex: 1}}>
            <Text
              style={{fontWeight: "bold", textAlign: "center", fontSize: 24}}
            >
              Monthly Data
            </Text>
            <View style={{padding: 2}} />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 25,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Picker
                ref={pickerRef}
                selectedValue={fmonthlydatayear}
                onValueChange={(itemValue, itemIndex) =>
                  setfmonthlydatayear(itemValue)
                }
              >
                <Picker.Item label="Please select a year" value="0" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
                <Picker.Item label="2031" value="2031" />
                <Picker.Item label="2032" value="2032" />
                <Picker.Item label="2033" value="2033" />
                <Picker.Item label="2034" value="2034" />
                <Picker.Item label="2035" value="2035" />
                <Picker.Item label="2036" value="2036" />
              </Picker>
            </View>
            <View style={{padding: 2}} />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 25,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Picker
                ref={pickerRef}
                selectedValue={fmonthlydatamonth}
                onValueChange={(itemValue, itemIndex) =>
                  setfmonthlydatamonth(itemValue)
                }
              >
                <Picker.Item label="Please select a month" value="0" />
                <Picker.Item label="January" value="1" />
                <Picker.Item label="February" value="2" />
                <Picker.Item label="March" value="3" />
                <Picker.Item label="April" value="4" />
                <Picker.Item label="May" value="5" />
                <Picker.Item label="June" value="6" />
                <Picker.Item label="July" value="7" />
                <Picker.Item label="August" value="8" />
                <Picker.Item label="September" value="9" />
                <Picker.Item label="October" value="10" />
                <Picker.Item label="November" value="11" />
                <Picker.Item label="December" value="12" />
              </Picker>
            </View>
            <View style={{padding: 2}} />

            <View style={styles.rowers}>
              <TouchableOpacity
                style={styles.button1}
                themeType="raised"
                onPress={() =>
                  retrieveMonthData(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours,
                    fmonthlydatayear,
                    fmonthlydatamonth
                  )
                }
              >
                <Text style={{color: "white"}}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 2}} />
            <View style={styles.border_view}>
              <LineChart
                data={monthlydata}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
              />
            </View>

            <View style={{padding: 10}} />

            <View style={styles.border_view}>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text> </Text>
                <Text style={styles.tables_hours}> Scheduled:</Text>
                <Text style={styles.tables_hours}> Completed:</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Freetime </Text>
                <Text style={styles.tables_hours}>{monthlyfreeTimeHours} </Text>
                <Text style={styles.tables_hours}>
                  {actualmonthlyFreeTimeHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Homework </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {monthlyhomeworkHours}{" "}
                </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualmonthlyHomeworkHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Sleep </Text>
                <Text style={styles.tables_hours}> {monthlysleepHours} </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualmonthlySleepHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Studying </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {monthlystudyingHours}{" "}
                </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualmonthlyStudyingHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Commuting </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {monthlycommutingHours}{" "}
                </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualmonthlyCommutingHours}{" "}
                </Text>
              </View>
            </View>

            <View style={{paddingTop: 40}}>
              <Text style={styles.score_header}>Overall Progress: {monthlydisplayScore.toFixed(0)}%</Text>
              <ProgressBarAnimated
                width={Dimensions.get("window").width}
                value={monthlydisplayScore}
                backgroundColor="#FF0000"
                backgroundColorOnComplete="#32CD32"
              />
              <View style={{paddingTop: 40}}></View>
            </View>
          </ScrollView>
        ) : null}
      </View>

      <View style={styles.rowers}>
        {shouldShowYear ? (
          <ScrollView style={{flex: 1}}>
            <View style={{padding: 2}} />
            <Text
              style={{fontWeight: "bold", textAlign: "center", fontSize: 24}}
            >
              Yearly Data
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 25,
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Picker
                ref={pickerRef}
                selectedValue={fyeartemp}
                onValueChange={(itemValue, itemIndex) =>
                  setfyeartemp(itemValue)
                }
              >
                <Picker.Item label="Please select a year" value="0" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2023" value="2023" />
                <Picker.Item label="2024" value="2024" />
                <Picker.Item label="2025" value="2025" />
                <Picker.Item label="2026" value="2026" />
                <Picker.Item label="2027" value="2027" />
                <Picker.Item label="2028" value="2028" />
                <Picker.Item label="2029" value="2029" />
                <Picker.Item label="2030" value="2030" />
                <Picker.Item label="2031" value="2031" />
                <Picker.Item label="2032" value="2032" />
                <Picker.Item label="2033" value="2033" />
                <Picker.Item label="2034" value="2034" />
                <Picker.Item label="2035" value="2035" />
                <Picker.Item label="2036" value="2036" />
              </Picker>
            </View>

            <View style={{padding: 2}} />
            <View style={styles.rowers}>
              <TouchableOpacity
                style={styles.button1}
                themeType="raised"
                onPress={() =>
                  retrieveYearData(
                    fdatee,
                    freeTimeHours,
                    homeworkHours,
                    sleepHours,
                    studyingHours,
                    commutingHours,
                    fyeartemp
                  )
                }
              >
                <Text style={{color: "white"}}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding: 2}} />
            <View style={styles.border_view}>
              <LineChart
                data={yearlydata}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                }}
              />
            </View>

            <View style={{padding: 10}} />

            <View style={styles.border_view}>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text> </Text>
                <Text style={styles.tables_hours}> Scheduled:</Text>
                <Text style={styles.tables_hours}> Completed:</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Freetime </Text>
                <Text style={styles.tables_hours}>{yearlyfreeTimeHours} </Text>
                <Text style={styles.tables_hours}>
                  {actualyearlyFreeTimeHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Homework </Text>
                <Text style={styles.tables_hours}> {yearlyhomeworkHours} </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualyearlyHomeworkHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Sleep </Text>
                <Text style={styles.tables_hours}> {yearlysleepHours} </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualyearlySleepHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.tables_hours}> Studying </Text>
                <Text style={styles.tables_hours}> {yearlystudyingHours} </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualyearlyStudyingHours}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "#A9A9A9"
                }}
              >
                <Text style={styles.tables_hours}> Commuting </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {yearlycommutingHours}{" "}
                </Text>
                <Text style={styles.tables_hours}>
                  {" "}
                  {actualyearlyCommutingHours}{" "}
                </Text>
              </View>
            </View>

            <View style={{paddingTop: 40}}>
              <Text style={styles.score_header}>Overall Progress: {yearlydisplayScore.toFixed(0)}%</Text>
              <ProgressBarAnimated
                width={Dimensions.get("window").width}
                value={yearlydisplayScore}
                backgroundColor="#FF0000"
                backgroundColorOnComplete="#32CD32"
              />
              <Text style={styles.score_header}>
              </Text>
              <View style={{paddingTop: 40}}></View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  score_header: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  tables_hours: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 'bold'
  },
  table_view: {
    paddingTop: 10
  },
  date_style: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 20,
    paddingTop: 20
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#7acfcf",
    padding: 10,
    borderRadius: 5
  },
  rowers: {
    flexDirection: "row",
    justifyContent: "center"
  },
  datepickerview: {
    justifyContent: "center"
  },
  border_view: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "#85e0e0",
    // distance of each cell
    paddingBottom: 10,
    //distance between each cell
    textAlign: "center",
    justifyContent: "center"
  },
  datePicker: {
    width: Dimensions.get("window").width,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  }
});