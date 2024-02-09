import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeItem } from "../utils/asyncStorage";
import LottieView from "lottie-react-native";
import Button from "./components/Button";
export default function HomeScreen() {
  const navigation = useNavigation();
  const handleReset = async () => {
    await removeItem("onboarded");
    removeItem("token");
    navigation.push("Onboarding");
  };
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.leaf}
        source={require("../assets/animations/leaf.json")}
        autoPlay
      ></LottieView>
      <LottieView
        style={styles.welcome}
        source={require("../assets/animations/welcome.json")}
        autoPlay
      ></LottieView>
      <Text style={styles.title}>Welcome To Bleaf</Text>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Bleaf is selfcare app.Bleaf is your future self, reminding you to put
        your present self first.
      </Text>
      <Button
        title="Join Now"
        onPress={() => navigation.navigate("Signup")}
      ></Button>
      <View style={styles.account}>
        <Text>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text> Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    color: "#29eecb",
  },
  leaf: {
    height: 100,
    width: 100,
  },
  welcome: {
    height: 400,
    width: 400,
  },
  account: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
