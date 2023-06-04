import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";

// const DATA = [
//   { timestamp: Date.now(), text: "Sample Text", checked: false },
//   { timestamp: Date.now() + 1, text: "Sample Text 2", checked: false },
// ];

export default function App() {
  const [text, setText] = React.useState("");
  const [data, setData] = React.useState([]); // DATA를 넣을 때는 []를 지우고 입력
  const [darkMode, setDarkMode] = React.useState(false);

  const handleDelete = (timestamp) => {
    const res = data.filter((item) => item.timestamp !== timestamp);
    setData(res);
  };

  const handleChecked = (timestamp) => {
    const updatedData = data.map((item) => {
      if (item.timestamp === timestamp) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleAdd = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp).toLocaleDateString();
    const newItem = { timestamp, text, checked: false, date };
    setData([...data, newItem]);
    setText("");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: wp(90),
          height: wp(90) / 4,
          backgroundColor: darkMode ? "#333" : "#FFF",
          marginHorizontal: wp(5),
          borderRadius: 10,
          marginBottom: hp(2),
          flexDirection: "row",
          alignItems: "center",
          textDecorationLine: item.checked ? "line-through" : "none",
        }}
      >
        <View style={{ width: hp(4), height: hp(4), backgroundColor: "#8D71FE", borderRadius: 4, marginHorizontal: wp(5), opacity: 0.4 }} />
        <Text style={{ width: wp(60), color: darkMode ? "#FFF" : "#000" }}>{item.text}</Text>
        <Text style={{ width: wp(10), textAlign: "right", marginRight: wp(1), color: darkMode ? "#999" : "#666" }}>{item.date}</Text>
        <View style={{ width: hp(2), height: hp(2), backgroundColor: "#8D71FE", borderRadius: 100, marginHorizontal: wp(3) }}/>
      </View>
    );
  };

  const renderHiddenItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: wp(5), paddingVertical: hp(2.5) }}>
        <TouchableOpacity onPress={() => handleChecked(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.timestamp)}>
          <Text style={{ fontSize: hp(3) }}>🗑</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={{ width: wp(100), height: hp(20), justifyContent: "center", paddingLeft: wp(10) }}>
        <Text style={{ fontSize: hp(3), fontWeight: "bold", color: darkMode ? "#FFF" : "#000" }}>✔️ To-Do List</Text>
      </View>
      <View style={{ width: wp(100), height: hp(70) }}>
        <SwipeListView data={data} renderItem={renderItem} leftOpenValue={wp(10)} rightOpenValue={-wp(10)} renderHiddenItem={renderHiddenItem} />
      </View>
      <View style={{ width: wp(100), height: hp(10), flexDirection: "row" }}>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={{ fontSize: hp(3), color: darkMode ? "#FFF" : "#000" }}>{darkMode ? "🌞" : "🌙"}</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="텍스트를 입력해주세요."
          value={text}
          onChangeText={(item) => setText(item)}
          placeholderTextColor="#aaa"
          style={{ width: wp(60), marginLeft: wp(10), backgroundColor: darkMode ? "#333" : "#FFF", height: hp(5), paddingLeft: wp(3), borderRadius: 10, color: darkMode ? "#FFF" : "#000" }}
        />
        <TouchableOpacity
          style={{
            width: hp(5),
            height: hp(5),
            marginLeft: wp(10),
            backgroundColor: darkMode ? "#666" : "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
          onPress={handleAdd}
        >
          <Text style={{ color: darkMode ? "#FFF" : "#000" }}>➕</Text>
        </TouchableOpacity>
        </View>
        <View style={{ width: wp(100), height: hp(10), justifyContent: "center", alignItems: "center" }}>  
        </View>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  darkContainer: {
    backgroundColor: "#222",
  },
});
