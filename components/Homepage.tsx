import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Pantry from "./Pantry";
import Waste from "./Waste"
import { getPantry, PantryItem } from "../src/pantry";

export default function Homepage() {
  const [inPantry, setInPantry] = useState<boolean>(false);
  const [inWaste, setInWaste] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<PantryItem[]>([]);

useEffect(() => {
  const getNotifications = async () => {
    const pantryList: any = await getPantry();
    const notifyList = []
    for(let i = 0; i < pantryList.length; i++) {
      const currDate = Number(new Date());
      const countdown = Math.round((pantryList[i].expiry - currDate) / 86400000);
      if (countdown < 4) {
        notifyList.push(pantryList[i])
      }
    }
    setNotifications(notifyList)
  }
  getNotifications()
}, [inPantry, inWaste])

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
        <TouchableOpacity
          style={styles.homeButtons}
          onPress={() => {
            setInWaste(true);
          }}
        >
          <Text style={styles.homeButtonText}>Waste</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wasteList}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => {
            const expiration = new Date(item.expiry);
            return (
              <TouchableOpacity style={styles.display} key={item.item_id}>
                <View>
                  <View style={styles.image}>
                    <Text>Food item category image here</Text>
                  </View>
                  <Text style={styles.text}>{item.name}</Text>
                  <Text style={styles.text}>
                    {expiration.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={2}
        />
      </View>
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
    height: "20%",
    width: "80%",
    borderRadius: 25,
  },
  wasteList: {
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
