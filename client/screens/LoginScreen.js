// ios Client ID 566797729824-hv24ge4aqs2cvqvagnku0l28nbtfltj9.apps.googleusercontent.com


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
// import {statusbar} from 'expo-status-bar';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import * as AuthSession from 'expo-auth-session';
// import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
 // const [request,promptAsync] = Google.useAuthRequest(566797729824-hv24ge4aqs2cvqvagnku0l28nbtfltj9.apps.googleusercontent.com);

  // const response = null
  const promtAsync = null
  React.useEffect(() => {
    handleGoogleLogin();
  }, [response]);

  const handleLogin = async (e) => {
    e.preventDefault();
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
  };


  // async function handleGoogleLogin() {
  //   const user = await AsyncStorage.getItem("@user");
  //   if (!user) {
  //     if (response?.type === "success") {
  //       await getUserInfo(response.authentication.accessToken);
  //     }
  //   } else {
  //       setUserInfo(JSON.parse(user));
  //   }
  // }


  // THIS IS THE MORE RECENT VERSION OF GOOGLE OAUTH
  // handleGoogleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setState({ userInfo });
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       return
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //        console.log("sign in is in progress already")
  //       // operation (e.g. sign in) is in progress already
  //     } else {
  //         console.log("Error")
  //     }
  //   }
  // }

 

  // const getUserInfo = async (token) => {
  //   if (!token) return;
  //   try {
  //     const response = await fetch(
  //       "https://www.googleapis.com/userinfo/v2/me",
  //       {
  //         headers: { Authorization: `Bearer ${token}`},
  //       }
  //     );
  //     const user = await response.json();
  //     await AsyncStorage.setItem("@user", JSON.stringify(user));
  //     setUserInfo(user);
  //   } catch (error) {
  //     console.log(error)
  //   }
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

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

        {error && <Text style={{color: 'red'}}>{
              console.log(`error displayed: ${error}`)}
              {error}
             </Text>
        }

      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.loginsub}>Or, login with ...</Text>
      <View style={styles.sociallogo}>
        <TouchableOpacity onPress={() => {}} style={styles.tinyLogom}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/facebook.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => promptAsync()} style={styles.tinyLogom}>
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
          <Text style={styles.registertxt} style={{color: 'blue'}}> Register</Text>
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
    borderRadius: 75, 
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
