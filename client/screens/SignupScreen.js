import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import Button from "./components/Button";
import { useRegisterMutation } from "../api/bleafApi";
import { setCredentials } from "../actions/tokenSlice";
import { useDispatch } from "react-redux";
const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register({
        firstName,
        username,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(result));
      setFirstName("");
      setUsername("");
      setLastName("");
      setEmail("");
      setPassword("");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.img}>
        <LottieView
          style={styles.login}
          source={require("../assets/animations/login.json")}
          autoPlay
        ></LottieView>
        <Text style={styles.title}>Register</Text>
      </View>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* <Button title="Edit" onPress={handleEdit} /> */}
      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  img: {
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
  },
});

export default SignupScreen;
