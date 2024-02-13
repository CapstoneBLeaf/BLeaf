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
import { useLoginUserMutation } from "../api/bleafApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../actions/tokenSlice";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [errors,setErrors] = useState({})
  const validateForm = () => {
    let errors = {}
    if(!username) errors.username = "Username is required"
    if(!password) errors.password = "Password is required"
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if(validateForm()){
    try {
      const result = await loginUser({
        username,
        password
      }).unwrap();
      dispatch(setCredentials(result));
      setUsername("");
      setPassword("");
      navigation.navigate("Home");
      console.log("Username:", username);
      console.log("Password:", password);
    } catch (rejected) {
      setError(rejected.data.error);
      console.log(`error caught: ${error}`);
    }
  }
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
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      {error && (
        <Text>
          {console.log(`error displayed: ${error}`)}
          {error}
        </Text>
      )}
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
          <Text style={styles.registertxt}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textAlign: 'center'
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
  errorText:{
    color: 'red',
    marginTop: 10,
    textAlign: 'left'
  },
  register: { flexDirection: "row", justifyContent: "center" },
});

export default LoginScreen;