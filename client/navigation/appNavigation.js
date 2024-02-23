import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import UserScreen from "../screens/UserScreen";
import GoalsScreen from "../screens/GoalsScreen";
import AcitivityScreen from "../screens/AcitivityScreen";
import HabitsScreen from "../screens/HabitsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getItem } from "../utils/asyncStorage.js";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// screen names
const accountName = "Account";
const habitsName = "Habits";
const goalName = "Goals";
const activityName = "Acitivity";
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

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={habitsName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#2c2cff",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: [{ fontSize: 10 }],
          tabBarStyle: [
            {
              padding: 10,
            },
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === habitsName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === accountName) {
              iconName = focused ? "person" : "person-outline";
            } else if (rn === goalName) {
              iconName = focused ? "trophy" : "trophy-outline";
            } else if (rn === activityName) {
              iconName = focused ? "book" : "book-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={habitsName} component={HabitsScreen} />
        <Tab.Screen name={goalName} component={GoalsScreen} />
        <Tab.Screen name={activityName} component={AcitivityScreen} />
        <Tab.Screen name={accountName} component={UserScreen} />
      </Tab.Navigator>
    );
  };

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: true }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: true }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Onboarding"
            options={{ headerShown: false }}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Signup"
            options={{ headerShown: true }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: true }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
