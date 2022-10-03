
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import {Picker} from "@react-native-picker/picker";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("appdb.db");
  return db;
}

const db = openDatabase();


function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, category }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{  backgroundColor: category === 1 ? "#8BD3E6" :
                                     category === 2 ? "#FF6D6A" :
                                     category === 3 ? "#E9EC6B" :
                                     category === 4 ? "#EFBE7D" :
                                     category === 5 ? "#B1A2CA" :
                                     "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
            borderRadius: 25,
            paddingTop: 5,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'black'}}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function Todo() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const [category, setCategory] = useState(0);
  const [categoryTemp, setCategoryTemp] = useState(0);


  const [tag, setTag] = useState(0);


  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text, category int);"
      );
    });
  }, []);



  const add = (text, tag) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    try {
      db.transaction(
        (tx) => {
          tx.executeSql("insert into items (done, value, category) values (0, ?, ?)", [text, tag]);
          console.log("inserted")
          tx.executeSql("select * from items", [], (_, { rows }) =>
            console.log(JSON.stringify(rows)),
          );
        },
        null,
        forceUpdate
      );
      console.log("FUCK");
    }
    catch (error) {
      console.log(error);
    }


  }

  return (
    <View style={styles.container}>

          <ScrollView style={styles.listArea}>
            <Items
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`update items set done = 1 where id = ?;`, [
                      id,
                    ]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
            <Items
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`delete from items where id = ?;`, [id]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
          </ScrollView>
          <Text style={{fontSize: 30, textAlign: "center", marginTop: 20, fontWeight:'bold'}}>Tasks todo</Text>

          {Platform.OS === "web" ? (
            <View
              style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={styles.heading}>
                Expo SQlite is not supported on web!
              </Text>
            </View>
          ) : (
            <>
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
              selectedValue={tag}
              onValueChange={(itemValue, itemIndex) => setTag(itemValue)}
              style={{color:'black'}}>
              <Picker.Item label="Choose a tag for your todo!"  value="0" />
              <Picker.Item label="⦿ Homework ⦿"  value="1" color="#8BD3E6" />
              <Picker.Item label="⦿ Study ⦿"  value="2" color="#FF6D6A" />
              <Picker.Item label="⦿ Chore ⦿"     value="3" color="#e6e600"/>
              <Picker.Item label="⦿ Errand ⦿"     value="4" color="#EFBE7D" />
              <Picker.Item label="⦿ Urgent ⦿" value="5" color="#B1A2CA" />
            </Picker>
          </View>


              <View style={styles.flexRow}>
                <TextInput
                  onChangeText={(text) => setText(text)}
                  placeholder="Insert tasks you need to do here!"
                  style={styles.input}
                  value={text}
                />
                <TouchableOpacity
                  onPress={() =>add(text, tag)}
                  style={{
                    margin: 15,
                    borderRadius: 100,
                    width: 55,
                    height: 55,
                    borderWidth: 1,
                    borderColor: 'black',
                    backgroundColor: '#7acfcf',
                    textAlign: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,

                  }}

                  >
                  <Text >Submit</Text>

                  </TouchableOpacity>
              </View>



        </>
      )}
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    textAlign: "center",
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    borderRadius: 25,
    fontWeight:'bold',
    color:'black',
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
    justifyContent: 'center',
    textAlign: 'center',
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,

  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
    textAlign: 'center',

  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    justifyContent: 'center',
    textAlign: 'center',

  },

});