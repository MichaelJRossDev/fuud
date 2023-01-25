import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, TextInput, TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import LogIn from "./components/login"
import Homepage from "./components/Homepage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  if (loggedIn === false) {
    return <LogIn setLoggedIn={setLoggedIn} />;
  } else {
    return (
      <Homepage/>
    );
  }
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#f5f6f4",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#d08651",
  },

  loginText: {
    color: "#f5f6f4",
  },
});
