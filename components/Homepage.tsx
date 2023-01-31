import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Pantry from "./Pantry";
import Waste from "./Waste"

export default function Homepage() {
  const [inPantry, setInPantry] = useState<boolean>(false);
  const [inWaste, setInWaste] = useState<boolean>(false);


  if (inPantry) {
    return <Pantry setInPantry={setInPantry} />;
  } else if (inWaste) {
    return <Waste setInWaste={setInWaste}/>
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>fuud.</Text>
      </View>
      <View>
        <Text style={styles.slogan}>Waste Less, Save More, Live More.</Text>
      </View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.homeButtons}
          onPress={() => {
            setInPantry(true);
          }}
        >
          <Text style={styles.homeButtonText}>Pantry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButtons} onPress={() => {
            setInWaste(true);
        }}>
          <Text style={styles.homeButtonText}>Waste</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notifications}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5f6f4",
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

  slogan: {
    fontSize: 20,
    fontWeight: "500",
    color: "#34282e",
    alignSelf: "baseline",
  },

  nav: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    margin: 40,
  },

  homeButtons: {
    backgroundColor: "#95a99c",
    padding: 40,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
  },

  homeButtonText: {
    fontSize: 30,
    color: "#34282e",
  },

  notifications: {
    backgroundColor: "#95a99c",
    height: "60%",
    width: "80%",
    borderRadius: 25,
  },
});
