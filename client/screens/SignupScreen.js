import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Button from "./components/Button";
const SignupScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [isEditing, setIsEditing] = useState(false);

  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  const handleSave = async () => {
    try {
      // Save the changes to the user's profile
      await updateUserProfile({
        firstName,
        lastName,
        email,
        password,
        username,
      });
      // Show a success message or navigate to another screen
    } catch (error) {
      // Show an error message or handle the error in some other way
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {/* <Button title="Edit" onPress={handleEdit} /> */}
      <Button title="Register" onPress={handleSave} />
    </View>
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
