import React, { useState } from "react";
import { View, Text, Image,TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import Button from "./components/Button";
import { useRegisterMutation } from "../api/bleafApi";
import { setCredentials } from "../actions/tokenSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";


const SignupScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register({
        firstname,
        username,
        lastname,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(result));
      setFirstname("");
      setUsername("");
      setLastname("");
      setEmail("");
      setPassword("");
      console.log(result);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={styles.img}>
        <LottieView
          style={styles.login}
          source={require("../assets/animations/login.json")}
          autoPlay
        ></LottieView>
      </View>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
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
      <Text style={styles.loginsub}>Or, register with...</Text>
      <View style={styles.sociallogo}>
        <TouchableOpacity onPress={() => {}} style={styles.tinyLogom}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/facebook.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.tinyLogom}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/google.png")}
          />
        </TouchableOpacity>
      </View>
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
  img: {
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    height: 24,
    width: 24,
  },
  sociallogo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  tinyLogom: {
    borderColor: "#ddd",
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default SignupScreen;