import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ItemAdder from "./ItemAdder";
import Scanner from "./Scanner";
import { getPantry, PantryItem } from "../src/pantry";
import { Button } from "react-native-paper";

export default function AddItem({ setInAddItem,setPantryList }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<number>(Number(new Date()));
  const [show, setShow] = useState<boolean>(false);
  const [openScanner, setOpenScanner] = useState<boolean>(false);

  if (openScanner) {
    return (
      <Scanner
        setOpenScanner={setOpenScanner}
        setName={setName}
        setQuantity={setQuantity}
        setUnit={setUnit}
        setShow={setShow}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {show && (
          <RNDateTimePicker
            mode="date"
            onChange={(event, date) => {
              setExpiryDate(Number(date));
              setShow(false);
            }}
            value={new Date()}
          />
        )}
        <View style={styles.header}>
          <Text style={styles.logo}>fuud.</Text>
        </View>
        <View style={styles.addOptions}>
          <Button
            style={styles.addOptionsBtn}
            onPress={() => {
              setOpenScanner(true);
            }}
            type="elevated"
            icon="barcode"
            labelStyle={{color: "#fff"}}
          >
            <Text style={styles.addOptionsText}>Scan</Text>
          </Button>
        </View>

        <View style={styles.addItemInputs}>
          <TextInput
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="Item Name"
            style={styles.inputs}
            value={name}
          />

          <TouchableOpacity
            style={styles.inputs}
            onPress={() => {
              setShow(true);
            }}
          >
            <Text>Expiry: {new Date(expiryDate).toLocaleDateString()}</Text>
          </TouchableOpacity>

          <TextInput
            onChangeText={(number) => {
              setQuantity(parseInt(number));
            }}
            placeholder="Weight/quantity"
            style={styles.inputs}
            value={quantity.toString()}
          />

          <TextInput
            onChangeText={(string) => {
              setUnit(string);
            }}
            placeholder="Units"
            style={styles.inputs}
            value={unit}
          />

        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            onPress={() => {
              ItemAdder(name, quantity, selectedCategory, unit, expiryDate);
              setInAddItem(false);
              const getPantryList = async () => {
                const pantry: any = await getPantry();
                setPantryList(pantry);
              };
              getPantryList();
            }}
            style={styles.addItemBtn}
          >
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
    justifyContent: "center",
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
    color: "#fff",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },

  picker: {
    height: 25,
    alignItems: "center",
  },
});
