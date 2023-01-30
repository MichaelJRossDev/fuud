import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function AddItem({ setInAddItem }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<any>(new Date());
  const [show, setShow] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {show && (
        <RNDateTimePicker
          mode="date"
          onChange={(event, date) => {
            setExpiryDate(date);
            console.log(date);
            setShow(false);
          }}
          value={new Date()}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>

      <View style={styles.addOptions}>
        <TouchableOpacity style={styles.addOptionsBtn}>
          <Text style={styles.addOptionsText}>Barcode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addOptionsBtn}>
          <Text style={styles.addOptionsText}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addItemInputs}>
        <TextInput
          onChangeText={(text) => {
            setName(text);
          }}
          placeholder="Item Name"
          style={styles.inputs}
        />

        <TouchableOpacity
          style={styles.inputs}
          onPress={() => {
            setShow(true);
          }}
        >
          <Text>Expiry: {expiryDate.toDateString()}</Text>
        </TouchableOpacity>

        <TextInput
          onChangeText={(number) => {
            setQuantity(parseInt(number));
          }}
          placeholder="Weight"
          style={styles.inputs}
        />
        <TextInput
          onChangeText={(string) => {
            setUnit(string);
          }}
          placeholder="Quantity"
          style={styles.inputs}
        />

        <View>
          <Picker style={styles.inputs}
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => {
              setSelectedCategory(itemValue);
            }}
          >
            <Picker.Item label="Category" value={"Please Select"} />
            <Picker.Item label="Meat" value={"Meat"} />
            <Picker.Item label="Vegetables" value={"Vegetables"} />
            <Picker.Item label="Fruit" value={"Fruit"} />
          </Picker>
        </View>
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity onPress={() => {}} style={styles.addItemBtn}>
          <Text style={styles.addItemText}> Add </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setInAddItem(false);
          }}
          style={styles.cancelBtn}
        >
          <Text style={styles.cancelText}> Cancel </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34282e",
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

  addOptions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    margin: 20,
  },

  addOptionsBtn: {
    backgroundColor: "#D08651",
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
  },

  addOptionsText: {
    fontSize: 15,
    color: "#34282e",
  },

  addItemInputs: {
    width: "80%",
    margin: 10,
  },

  inputs: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "#f5f6f4",
  },

  btnView: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  addItemBtn: {
    width: "20%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
    height: "30%",
  },

  addItemText: {
    color: "#f5f6f4",
  },

  cancelBtn: {
    width: "20%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
    height: "30%",
  },

  cancelText: {
    color: "#f5f6f4",
  },

  picker: {
    height: 25,
    alignItems: "center",
  }
});
