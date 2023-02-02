import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image
  } from "react-native";
import { useState, useEffect } from "react";  
import { suggestRecipes } from "../src/pantry"

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
            <View>
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                            key={item.recipe_name}>
                                <Text>{item.recipe_name}</Text>
                                <Image source={{uri:item.recipe_image_url}} style={{width:"50%"}}/>
                                <Text>{item.recipe_image_url}</Text>
                                <Text>{item.recipe_URL}</Text>
                            </TouchableOpacity>
                        )}
                    }
                        />
                
            </View>
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
  
    navBar: { 
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "row",
    },
  
    searchBar: {
      alignSelf: "flex-start",
      width: "60%",
      height: 40,
      margin: 5,
      padding: 10,
    },
  
    addBtnView: {
      alignSelf: "flex-end"
  
    },
  
    pantryList: {
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
  
    addItemBtn: {
      borderRadius: 15,
      height: 50,
      width: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#d08651",
    },
  
    addItemText: {
      color: "#f5f6f4",
      fontSize: 40,
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