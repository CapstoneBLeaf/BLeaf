import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { setItem } from "../utils/asyncStorage";
import LottieView from "lottie-react-native";
export default function OnboardingScreen() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("Welcome");
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
            backgroundColor: "#32CB7E",
            image: (
              <View style={styles.img}>
                <LottieView
                  style={styles.meditation}
                  source={require("../assets/animations/meditation.json")}
                  autoPlay
                ></LottieView>
              </View>
            ),
            title: "Welcome to bLeaf",
            subtitle:
              "Help your plant grow by tracking and maintaining healthy habits",
          },
          {
            backgroundColor: "#1F91A3",
            image: (
              <View style={styles.img}>
                <LottieView
                  style={styles.meditation}
                  source={require("../assets/animations/meditation.json")}
                  autoPlay
                ></LottieView>
              </View>
            ),
            title: "Track Habits",
            subtitle: "Habit tracking can help create new habits",
          },
          {
            backgroundColor: "#6C6CFF",
            image: (
              <View style={styles.img}>
                <LottieView
                  style={styles.meditation}
                  source={require("../assets/animations/meditation.json")}
                  autoPlay
                ></LottieView>
              </View>
            ),
            title: "Set Goals & Check In",
            subtitle: "Setting goals and reminders is a great way to start!",
          },
          {
            backgroundColor: "#F4A9A9",
            image: (
              <View style={styles.img}>
                <LottieView
                  style={styles.meditation}
                  source={require("../assets/animations/meditation.json")}
                  autoPlay
                ></LottieView>
              </View>
            ),
            title: "Don't forget to bLeaf in yourself!",
            subtitle:
              "Daily progress will be tracked, as you grow, so will your plant!",
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
  meditation: {
    width: 300,
    height: 300,
  },
});
