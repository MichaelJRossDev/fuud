import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
  } from "react-native";
import { getGraveyard } from "../src/pantry";
import { PantryItem } from "../src/pantry";
import { Button, Card } from "react-native-paper";


export default function Waste({ setInWaste }) {
       const [wasteList, setWasteList] = useState<PantryItem[]>([]);

       useEffect(() => {
         const getWasteList = async () => {
           const waste: any = await getGraveyard();
           setWasteList(waste);
         };
         getWasteList();
       }, []);
  
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setInWaste(false);
            }}
          >
            <Text style={styles.logo}>fuud.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wasteList}>
          <FlatList
            data={wasteList}
            renderItem={({ item }) => {
              const expiration = new Date(item.expiry);
              return (
                <Card style={styles.display} key={item.item_id}>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>
                      {expiration.toLocaleDateString()}
                    </Text>
                  </View>
                </Card>
              );
            }}
          />
        </View>
        <View>
          <Button
            onPress={() => {
              setInWaste(false);
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

  searchBar: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    width: "90%",
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

  wasteList: {
    marginTop: 40,
    backgroundColor: "#FBF8DE",
    height: "55%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    display: "flex",
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