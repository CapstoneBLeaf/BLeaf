import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
  const [errors, setErrors] = useState({});
  const [userError, setUserError] = useState();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateForm = () => {
    let errors = {};
    if (!firstname) errors.firstname = "Firstname is required";
    if (!username) errors.username = "Username is required";
    if (!lastname) errors.lastname = "Lastname is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
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
        navigation.navigate("Home");
      } catch (error) {
        setUserError(error.data.error)
        console.error(error);
      }
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
      {userError && <Text style={styles.errorText}>{userError}</Text> }
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => setFirstname(text)}
        value={firstname}
      />
      {errors.firstname ? (
        <Text style={styles.errorText}>{errors.firstname}</Text>
      ) : null}
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => setLastname(text)}
        value={lastname}
      />
      {errors.lastname ? (
        <Text style={styles.errorText}>{errors.lastname}</Text>
      ) : null}
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {errors.username ? (
        <Text style={styles.errorText}>{errors.username}</Text>
      ) : null}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}
      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffffff",
  },
  loginsub: {
    marginBottom: 30,
    marginTop: 30,
    textAlign: "center",
  },
  input: {
    height: 45,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f3f3f4",
    borderRadius: 10,
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
    justifyContent: "center",
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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "left",
  },
});

export default SignupScreen;
