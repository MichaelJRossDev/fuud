import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CreateAcc from "./CreateAcc"
import {signIn} from "../src/users"

export default function LogIn({setLoggedIn}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createAcc, setCreateAcc] = useState<boolean>(false);

  if(createAcc === true) {
    return <CreateAcc setCreateAcc={setCreateAcc}/>
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#f5f6f4"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Password"
        placeholderTextColor="#f5f6f4"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity>
        <Text style={styles.forgot_button}> Forgot Password?</Text>
      </TouchableOpacity>

    
      <TouchableOpacity onPress={() => {
        signIn(email, password)
        setLoggedIn(true)}} 
        style={styles.loginBtn}>
          <Text style={styles.loginText}> Log In</Text>
          </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        setCreateAcc(true)}} 
        style={styles.loginBtn}>
      <Text style={styles.loginText}> Create Account</Text>
      </TouchableOpacity>
          </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A6855",
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#d08651",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    width: "70%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#95a99c",
    textAlign: "center",
  },

  loginBtn: {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#d08651",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#f5f6f4",
  },

  loginText: {
    color: "#f5f6f4",
  },
});
