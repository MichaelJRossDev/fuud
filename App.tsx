import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email"
        placeholderTextColor="#f5f6f4"
        onChangeText={(email) => setEmail(email)}
        />
        </View>
    <View style={styles.inputView}>
      <TextInput 
      style={styles.TextInput}
      placeholder="Password"
      placeholderTextColor="#f5f6f4"
      secureTextEntry={true}
      onChangeText={(password) => setPassword(password)}
      />
    </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: 50,
    flex: 1,
    padding:10,
    marginLeft: 20,
  }
});
