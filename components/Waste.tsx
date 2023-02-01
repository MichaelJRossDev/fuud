import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
  } from "react-native";
import { getGraveyard } from "../src/pantry";
import { PantryItem } from "../src/pantry";

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
        <TouchableOpacity  onPress={() => {setInWaste(false)}}>
          <Text style={styles.logo}>fuud.</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.slogan}>Welcome to the Graveyard</Text>
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
    )
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
      width:"90%",
    },
  
    pantryList: {
      marginTop: 10,
      backgroundColor: "#95a99c",
      height: "70%",
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
  });