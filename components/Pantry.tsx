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
import { useState, useEffect } from "react";
import { getPantry, PantryItem } from "../src/pantry";

export default function Pantry({ setInPantry }) {
  const [inAddItem, setInAddItem] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<PantryItem>();
  const [inItemCard, setInItemCard] = useState<boolean>(false);
  const [pantryList, setPantryList] = useState<PantryItem[]>([]);

useEffect(() => {
  const getPantryList = async () => {
    const pantry: any = await getPantry();
    setPantryList(pantry);
  };
  getPantryList();
}, []);

  if (inAddItem) {
    return <AddItem setInAddItem={setInAddItem} setPantryList={setPantryList} />;
  } else if (inItemCard) {
    return (
      <ItemCard
        name={itemInfo.name}
        expiryDate={itemInfo.expiry}
        category={itemInfo.category}
        quantity={itemInfo.quantity}
        unit={itemInfo.unit}
        setInItemCard={setInItemCard}
        itemId={itemInfo.item_id}
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

        <View style={styles.navBar}>
          <View style={styles.searchBar}>
            <TextInput placeholder="Search" />
          </View>

          <View style={styles.addBtnView}>
            <TouchableOpacity
              onPress={() => {
                setInAddItem(true);
              }}
              style={styles.addItemBtn}
            >
              <Text style={styles.addItemText}> + </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pantryList}>
          <FlatList
            data={pantryList}
            renderItem={({ item }) => {
              const expiration = new Date(item.expiry);
              return (
                <TouchableOpacity
                  style={styles.display}
                  key={item.item_id}
                  onPress={() => {
                    setItemInfo(item);
                    setInItemCard(true);
                  }}
                >
                  <View>
                    <View style={styles.image}>
                      <Text>Food item category image here</Text>
                    </View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{expiration.toLocaleDateString()}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setInPantry(false);
            }}
            style={styles.homeBtn}
          >
            <Text
              style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}
            >
              Return to Dashboard
            </Text>
          </TouchableOpacity>
        </View>
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

  navBar: { 
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },

  searchBar: {
    alignSelf: "flex-start",
    width: "60%",
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },

  addBtnView: {
    alignSelf: "flex-end"

  },

  pantryList: {
    marginTop: 10,
    backgroundColor: "#F5f6f4",
    height: "55%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
  },

  addItemBtn: {
    borderRadius: 15,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d08651",
  },

  addItemText: {
    color: "#f5f6f4",
    fontSize: 40,
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

  display: {
    borderRadius: 15,
    width: "45%",
    margin: 10,
    backgroundColor: "#95a99c",
    padding: 5,
    alignItems: "center",
  },
  image: {
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
  },
});
