import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import UserScreen from "../screens/UserScreen.js";
import HabitsScreen from "../screens/HabitsScreen.js";
import GoalsScreen from "../screens/GoalsScreen.js"; // Import GoalsScreen component
import { getItem } from "../utils/asyncStorage.js";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
          component={SignupScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="User"
          options={{ headerShown: false }}
          component={UserScreen}
        />
        <Stack.Screen
          name="Habits"
          options={{ headerShown: false }}
          component={HabitsScreen}
        />
        <Stack.Screen
          name="Goals"
          options={{ headerShown: false }}
          component={GoalsScreen} // Added GoalsScreen component
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
