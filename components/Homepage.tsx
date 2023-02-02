import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Pantry from "./Pantry";
import Waste from "./Waste"
import { getPantry, PantryItem } from "../src/pantry";
import { Button, Card } from "react-native-paper";

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
      <View style={styles.nav}>
        <Button
          type="elevated"
          style={styles.homeButtons}
          onPress={() => {
            setInPantry(true);
          }}
          icon="cupboard"
          labelStyle={{ color: "#fff" }}
        >
          <Text style={styles.homeButtonText}>Pantry</Text>
        </Button>

        <Button
          type="elevated"
          style={styles.homeButtons}
          onPress={() => {
            setInWaste(true);
          }}
          icon="delete"
          labelStyle={{ color: "#fff" }}
        >
          <Text style={styles.homeButtonText}>Waste</Text>
        </Button>
      </View>

      <View style={styles.notificationsList}>
        <FlatList
          data={notifications}
          renderItem={({ item }) => {
            const expiration = new Date(item.expiry);
            return (
              <Card style={styles.display} key={item.item_id}>
                <View>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.text}>
                    {expiration.toLocaleDateString()}
                  </Text>
                </View>
              </Card>
            );
          }}
        />
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

  nav: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    margin: 40,
  },

  homeButtons: {
    backgroundColor: "#D08651",
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
  },

  homeButtonText: {
    fontSize: 20,
    color: "#F5F6F4",
  },

  notificationsList: {
    marginTop: 10,
    backgroundColor: "#FBF8DE",
    height: "55%",
    width: "90%",
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
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
    color: "#F5F6F4",
    alignSelf: "center",
  },
});
