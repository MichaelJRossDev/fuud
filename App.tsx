import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A6855',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: "#d08651",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center"
  },

  TextInput: {
    width:"70%",
    borderRadius:20,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#95a99c",
    textAlign: "center",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color:"#f5f6f4",
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

  loginText: {
    color: "#f5f6f4"
  }
});
