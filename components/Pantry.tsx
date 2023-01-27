import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import AddItem from "./AddItem";
import ItemCard from "./ItemCard";
import { useState } from "react";
import { PantryItem } from "../src/pantry";

export default function Pantry({ setInPantry }) {
  const [inAddItem, setInAddItem] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<PantryItem>({
    name: "Bananas",
    expiry: Number(new Date(2023, 1, 1)),
    category: "Fruit",
    quantity: 5,
    unit: "units",
    item_id: 200,
  });
  const [inItemCard, setInItemCard] = useState<boolean>(true);
  const [pantryList, setPantryList] = useState<PantryItem[]>([
    {
      name: "Bananas",
      expiry: Number(new Date(2023, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 200,
    },
    {
      name: "Bread",
      expiry: Number(new Date(2023, 1, 3)),
      category: "Bread",
      quantity: 1,
      unit: "units",
      item_id: 201,
    },
    {
      name: "Chocolate",
      expiry: Number(new Date(2023, 2, 1)),
      category: "Sweets",
      quantity: 2,
      unit: "units",
      item_id: 202,
    },
  ]);

  if (inAddItem) {
    return <AddItem setInAddItem={setInAddItem} />;
  } else if (inItemCard) {
    return (
      <ItemCard
        name={itemInfo.name}
        expiryDate={itemInfo.expiry}
        category={itemInfo.category}
        quantity={itemInfo.quantity}
        unit={itemInfo.unit}
        setInItemCard={setInItemCard}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setInPantry(false);
            }}
          >
            <Text style={styles.logo}>fuud.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <TextInput placeholder="Search" />
        </View>
        <View style={styles.pantryList}>
          <ScrollView>
            <FlatList
              data={pantryList}
               />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            setInAddItem(true);
          }}
          style={styles.addItemBtn}
        >
          <Text style={styles.addItemText}> Add Item </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setInPantry(false);
          }}
          style={styles.homeBtn}
        >
          <Text style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}>
            Return to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    width: "90%",
  },

  pantryList: {
    marginTop: 10,
    backgroundColor: "#95a99c",
    height: "55%",
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
    marginTop: "5%",
    backgroundColor: "#d08651",
  },

  addItemText: {
    color: "#f5f6f4",
  },

  homeBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },
});
