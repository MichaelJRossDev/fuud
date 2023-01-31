import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function ItemCard({
  name,
  expiryDate,
  category,
  quantity,
  unit,
  setInItemCard,
}) {
  const date = new Date(expiryDate);
  const currDate = Number(new Date());
  const countdown = Math.round((expiryDate - currDate) / 86400000);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>

      <View style={styles.image}>
        <Text> {category} Image goes here...</Text>
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
        <TouchableOpacity style={styles.eatBtn} onPress={() => {
          
        }}>
          <Text style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}>
            I've eaten this item
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.binBtn}>
          <Text style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}>
            This item was wasted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setInItemCard(false);
          }}
          style={styles.pantryBtn}
        >
          <Text style={{ fontSize: 15, color: "#f5f6f4", fontWeight: "bold" }}>
            Return to Pantry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#95a99c",
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

  image: {
    marginTop: "5%",
    borderWidth: 1,
    height: "20%",
    width: "60%",
    backgroundColor: "#fff",
  },

  itemName: {
    marginTop: "5%",
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
    backgroundColor: "#d08651",
  },

  binBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },

  deleteBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },

  pantryBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },
});
