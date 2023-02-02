import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>
      <View>
        <Text style={styles.slogan}>Waste Less, Save More, Live More.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    height: "10%",
  },

  header: {
    padding: 10,
    backgroundColor: "#4a6855",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: "#d08651",
  },

  slogan: {
    fontSize: 20,
    fontWeight: "500",
    color: "#F5F6F4",
    alignSelf: "baseline",
  },
});
