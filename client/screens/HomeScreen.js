import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeItem } from "../utils/asyncStorage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/animations/logo-b.png")} />
      <Text style={styles.title}>Welcome To Bleaf</Text>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
});
