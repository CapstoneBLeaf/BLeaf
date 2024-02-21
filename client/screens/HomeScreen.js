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
    navigation.push("Onboarding");
  };
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        style={styles.leaf}
        source={require("../assets/animations/leaf.json")}
        autoPlay
      ></LottieView>
      <Text style={styles.title}>Welcome To Bleaf</Text>
      <LottieView
        style={styles.welcome}
        source={require("../assets/animations/welcome.json")}
        autoPlay
      ></LottieView>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text style={{ color: "#333" }}>Reset</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        Create an account & take a step toward selfcare
      </Text>
      <Button
        title="Join Now"
        onPress={() => navigation.navigate("Signup")}
      ></Button>
      <View style={styles.account}>
        <Text style={{ color: "#333", fontSize: 16 }}>
          Already have an account?
        </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "blue", fontSize: 16 }}> Login</Text>
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    color: "rgb(85, 207, 200)",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  leaf: {
    height: 100,
    width: 100,
  },
  welcome: {
    height: 350,
    width: 350,
  },
  account: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  resetButton: {
    marginBottom: 10,
  },
});
