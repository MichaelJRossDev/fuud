import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Linking
  } from "react-native";
import { useState, useEffect } from "react";  
import { suggestRecipes } from "../src/pantry"
import { Button } from "react-native-paper";

export default function SuggestRecipes({ setInRecipes }) {

    const [recipes, setRecipes] = useState<any>()

    useEffect(() => {
        const getRecipes = async () => {
            const recipesList = await suggestRecipes()
            setRecipes(recipesList)
        }
        getRecipes()
        console.log(recipes)
        }, [])

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setInRecipes(false);
            }}
          >
            <Text style={styles.logo}>fuud.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recipeList}>
          <FlatList
            data={recipes}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.display}
                  key={item.recipe_name}
                  onPress={() => {
                    Linking.openURL(item.recipe_URL);
                  }}
                >
                  <Text style={styles.text}>{item.recipe_name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
          <View>
            <Button
              onPress={() => {
                setInRecipes(false);
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

  recipeList: {
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