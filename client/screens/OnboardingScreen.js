import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { setItem } from "../utils/asyncStorage";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("Home");
    setItem("onboarded", "1");
  };
  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#44564A",
            image: (
              <View style={styles.img}>
                <Image source={require("../assets/animations/habit.jpg")} />
              </View>
            ),
            title: "Let's Get started",
            subtitle: "Welcome to Bleaf",
          },
          {
            backgroundColor: "#BF5335",
            image: (
              <View style={styles.img}>
                <Image source={require("../assets/animations/habit.jpg")} />
              </View>
            ),
            title: "Choose Habits",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#412E32",
            image: (
              <View style={styles.img}>
                <Image source={require("../assets/animations/habit.jpg")} />
              </View>
            ),
            title: "Set Goals with timer",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#6D7448",
            image: (
              <View style={styles.img}>
                <Image source={require("../assets/animations/habit.jpg")} />
              </View>
            ),
            title: "Make a journal",
            subtitle: "Done with React Native Onboarding Swiper",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD2C6",
  },
  doneButton: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: "100%",
    borderBottomLeftRadius: "100%",
  },
});
