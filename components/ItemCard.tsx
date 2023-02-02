import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addToGraveyard, deleteItemById, getPantry } from "../src/pantry";
import { Button } from "react-native-paper";


export default function ItemCard({
  name,
  expiryDate,
  category,
  quantity,
  unit,
  setInItemCard,
  itemId,
  setPantryList,
}) {
  const date = new Date(expiryDate);
  const currDate = Number(new Date());
  const countdown = Math.round((expiryDate - currDate) / 86400000);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>

      <View style={styles.itemName}>
        <Text style={{ fontSize: 40, color: "#34282e", fontWeight: "bold" }}>
          {name}
        </Text>
      </View>
      <View style={styles.itemQuantity}>
        <Text style={{ fontSize: 25, color: "#34282e", fontWeight: "bold" }}>
          {quantity} {unit}
        </Text>
      </View>
      <View style={styles.itemExpiry}>
        <Text style={{ fontSize: 20, color: "#34282e", fontWeight: "bold" }}>
          Expires: {date.toDateString()}
        </Text>
        <Text style={{ fontSize: 20, color: "#34282e", fontWeight: "bold" }}>
          Days left: {countdown}
        </Text>
      </View>
      <View style={styles.infoBtn}>
        <TouchableOpacity
          style={styles.eatBtn}
          onPress={() => {
            const deleteItem = async () => {
              await deleteItemById(itemId);
            };
            deleteItem();
            setInItemCard(false);
          }}
        >
          <Text style={{ fontSize: 15, color: "#34282E", fontWeight: "bold" }}>
            I've eaten this item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.binBtn}
          onPress={() => {
            const binItem = async () => {
              await addToGraveyard(itemId);
            };
            const deleteItem = async () => {
              await deleteItemById(itemId);
            };
            binItem();
            deleteItem();
            setInItemCard(false);
          }}
        >
          <Text style={{ fontSize: 15, color: "#34282E", fontWeight: "bold" }}>
            This item was wasted
          </Text>
        </TouchableOpacity>

        <View>
          <Button
            onPress={() => {
              setInItemCard(false);
            }}
            style={styles.homeBtn}
            icon="cupboard"
            labelStyle={{ color: "#fff" }}
          >
            <Text
              style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}
            >
              Pantry
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8DE",
    alignItems: "center",
    flexDirection: "column",
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

  itemName: {
    marginTop: "5%",
    color: "#34282E",
  },

  itemExpiry: {
    marginTop: "5%",
  },

  itemQuantity: {
    marginTop: "5%",
  },

  infoBtn: {
    width: "100%",
    alignItems: "center",
  },

  eatBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#95A99C",
  },

  binBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#95A99C",
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
