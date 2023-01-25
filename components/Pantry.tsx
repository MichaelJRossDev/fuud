import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AddItem from "./AddItem";
import { useState } from "react";

export default function Pantry({ setInPantry }) {
const [inAddItem, setInAddItem] = useState<boolean>(false)

    if (inAddItem) {
        return <AddItem setInAddItem={setInAddItem} />
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" />
      </View>
      <View style={styles.pantryList}></View>
          <TouchableOpacity onPress={() => {
              setInAddItem(true);
      }} style={styles.addItemBtn}>
        <Text style={styles.addItemText}> Add Item </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5f6f4",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    padding: 10,
    backgroundColor: "#4a6855",
    width: "100%",
    alignItems: "center",
  },

  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#d08651",
  },

  searchBar: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    width:"90%",
  },

  pantryList: {
    marginTop: 10,
    backgroundColor: "#95a99c",
    height: "70%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
  },

  addItemBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },

  addItemText: {
    color: "#f5f6f4",
  },
});
