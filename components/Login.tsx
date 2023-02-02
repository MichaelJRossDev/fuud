import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CreateAcc from "./CreateAcc";
import { signIn } from "../src/users";
import { Button } from "react-native-paper";
import Header from "./Header";

export default function LogIn({ setLoggedIn }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createAcc, setCreateAcc] = useState<boolean>(false);

  if (createAcc === true) {
    return <CreateAcc setCreateAcc={setCreateAcc} />;
  }
  return (
    <View style={styles.container}>

      <Header />

      <TextInput
        style={styles.TextInput}
        placeholder="Email..."
        placeholderTextColor="#34282E"
        onChangeText={(email) => setEmail(email)}
      />

      <TextInput
        style={styles.TextInput}
        placeholder="Password..."
        placeholderTextColor="#34282E"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <TouchableOpacity>
        <Text style={styles.forgot_button}> Forgot Password?</Text>
      </TouchableOpacity>

      <Button
        mode="elevated"
        onPress={() => {
          signIn(email, password, setLoggedIn);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}> Log In</Text>
      </Button>

      <Button
        mode="elevated"
        onPress={() => {
          setCreateAcc(true);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}> Create Account</Text>
      </Button>
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

  TextInput: {
    width: "70%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#F5F6F4",
    textAlign: "center",
  },

  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#95A99C",
  },

  forgot_button: {
    height: 30,
    margin: 15,
    color: "#F5F6F4",
  },

  loginText: {
    color: "#34282E",
    fontWeight: "bold",
  },
});
