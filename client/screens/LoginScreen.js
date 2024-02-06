import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/core";
import Button from "./components/Button";

// import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    // Navigate to Home screen after successful login
    navigation.navigate("Home");
  };

  // // Configure Gmail login
  // const [requestGmail, responseGmail, promptAsyncGmail] = useAuthRequest(
  //   {
  //     redirectUri: makeRedirectUri({ useProxy: true }),
  //     responseType: "token",
  //     clientId: "your-gmail-client-id",
  //     scopes: ["email"],
  //   },
  //   { authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth" } // Gmail OAuth endpoint
  // );

  // // Configure Facebook login
  // const [requestFacebook, responseFacebook, promptAsyncFacebook] =
  //   useAuthRequest(
  //     {
  //       redirectUri: makeRedirectUri({ useProxy: true }),
  //       responseType: "token",
  //       clientId: "your-facebook-app-id",
  //       scopes: ["public_profile", "email"],
  //     },
  //     { authorizationEndpoint: "https://www.facebook.com/v12.0/dialog/oauth" } // Facebook OAuth endpoint
  //   );

  // // Handle login with Gmail
  // const handleGmailLogin = async () => {
  //   const result = await promptAsyncGmail();
  //   // Handle the result accordingly
  // };

  // // Handle login with Facebook
  // const handleFacebookLogin = async () => {
  //   const result = await promptAsyncFacebook();
  //   // Handle the result accordingly
  // };

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <LottieView
          style={styles.login}
          source={require("../assets/animations/login.json")}
          autoPlay
        ></LottieView>
        <Text style={styles.title}>Login</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.loginsub}>Or, login with ...</Text>
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
      <View style={styles.register}>
        <Text style={styles.newapp}>New to the app?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={styles.registerbtn}
        >
          <Text style={styles.registertxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingRight: 20,
    paddingLeft: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 75, // for a circular image, adjust as needed
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  img: {
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    width: 250,
    height: 250,
  },
  loginsub: {
    marginBottom: 30,
    marginTop: 30,
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
  register: { flexDirection: "row", justifyContent: "center" },
});

export default LoginScreen;