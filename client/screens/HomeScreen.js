import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Image,
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
      <Image
        source={require("../assets/animations/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome To bLeaf</Text>
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
    fontSize: 36,
    fontWeight: 600,
    color: "rgb(85, 207, 200)",
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  logo: {
    height: 180,
    width: 180,
  },
  welcome: {
    height: 280,
    width: 280,
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
