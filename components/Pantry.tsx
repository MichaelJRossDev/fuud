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
import {
  addItem,
  getItemInfoByBarcode,
  getPantry,
  PantryItem,
  searchPantry,
} from "../src/pantry";
import { Searchbar } from "react-native-paper";
import { Button, Card } from "react-native-paper";

export default function Pantry({ setInPantry }) {
  const [inAddItem, setInAddItem] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState<PantryItem>();
  const [inItemCard, setInItemCard] = useState<boolean>(false);
  const [pantryList, setPantryList] = useState<PantryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [returnedList, setReturnedList] = useState<PantryItem[]>([]);

  useEffect(() => {
    const getPantryList = async () => {
      const pantry: any = await getPantry();
      setPantryList(pantry);
      setReturnedList(pantry);
    };
    getPantryList();
  }, [inItemCard, inAddItem]);

  useEffect(() => {
    const searchList = async () => {
      const results = await searchPantry(pantryList, searchQuery);
      setReturnedList(results);
    };
    searchList();
  }, [searchQuery]);

  const onChangeSearch = (query) => setSearchQuery(query);

  if (inAddItem) {
    return (
      <AddItem setInAddItem={setInAddItem} setPantryList={setPantryList} />
    );
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
        setPantryList={setPantryList}
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
            <Searchbar
              placeholder="Search"
              value={searchQuery}
              onChangeText={onChangeSearch}
              icon="magnify"
            />
          </View>

          <View style={styles.addBtnView}>
            <Button
              type="elevated"
              onPress={() => {
                setInAddItem(true);
              }}
              style={styles.addItemBtn}
            >
              <Text style={styles.addItemText}>+</Text>
            </Button>
          </View>
        </View>

        <View style={styles.pantryList}>
          <FlatList
            data={returnedList}
            extraData={returnedList}
            renderItem={({ item }) => {
              const expiration = new Date(item.expiry);
              return (
                <Card style={styles.display}>
                  <TouchableOpacity
                    key={item.item_id}
                    onPress={() => {
                      setItemInfo(item);
                      setInItemCard(true);
                    }}
                  >
                    <View>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text style={styles.text}>
                        {expiration.toLocaleDateString()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            }}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              setInPantry(false);
            }}
            style={styles.homeBtn}
            icon="home"
            labelStyle={{ color: "#fff" }}
          >
            <Text
              style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}
            >
              Dashboard
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8DE",
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
    marginBottom: 20,
  },

  searchBar: {
    alignSelf: "flex-start",
    width: "60%",
    height: 40,
    margin: 5,
    padding: 10,
  },

  addBtnView: {
    alignSelf: "flex-end",
    alignContent: "center",
    justifyContent: "center",
  },

  pantryList: {
    marginTop: 10,
    backgroundColor: "#FBF8DE",
    height: "55%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
  },

  addItemBtn: {
    marginTop: 20,
    borderRadius: 15,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d08651",
    alignSelf: "center",
  },

  addItemText: {
    color: "#f5f6f4",
    fontSize: 20,
    alignSelf: "center",
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
    margin: 10,
    backgroundColor: "#4A6855",
    padding: 5,
    alignSelf: "center",
    width: "80%",
    alignContent: "center",
  },

  text: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#F5F6F4",
  },
});
