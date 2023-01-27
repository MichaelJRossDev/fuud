import { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
  } from "react-native";


export default function ItemCard ({name, expiryDate, category, quantity, unit, setInItemCard}) {
    const date = new Date(expiryDate)
    const currDate = Number(new Date())
    const countdown = Math.round((expiryDate - currDate) /86400000)
    
    return (
        <View style={styles.container}>
        <View style={styles.header} >
                <Text style={styles.logo}>fuud.</Text>
            </View>
            <View style={styles.itemName}>
            <Text style={{fontSize: 30, fontFamily: "serif"}}>
                {name}
            </Text>
            </View>
            <View style={styles.itemQuantity}>
            <Text style={{fontSize: 30, fontFamily: "serif"}}>
                {quantity} {unit}
            </Text>
            </View>
            <View style={styles.itemExpiry}>
            <Text style={{fontSize: 20, fontFamily: "serif"}}>
                Expires: {date.toDateString()}
            </Text>
            <Text style={{fontSize:20, fontFamily: "serif"}}>
            Days left: {countdown}
            </Text>
            </View>
            <View style={styles.infoBtn}>
                <TouchableOpacity style={styles.eatBtn}>
                    <Text style={{fontSize: 30, color:"#f5f6f4"}}>
                        Eat
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.binBtn}>
                    <Text style={{fontSize: 30, color:"#f5f6f4"}}>
                        Bin
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn}>
                    <Text style={{fontSize: 30, color:"#f5f6f4"}}>
                        Delete
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setInItemCard(false)}} style={styles.pantryBtn}>
                    <Text> 
                        Return to Pantry
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f6f4",
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
    infoBtn: {
        width: "100%",
        alignItems: "center",
      },
    itemName : {
    },

    itemExpiry : {

    },

    itemQuantity : {
        
    },

    eatBtn : {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#d08651",
    },

    binBtn : {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#d08651",
    },

    deleteBtn : {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#d08651",
    },

    pantryBtn : {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#d08651",
    }
})