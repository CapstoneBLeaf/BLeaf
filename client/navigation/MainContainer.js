import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/Ionicons"

// import screens
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import HabitsScreen from "../screens/HabitsScreen";

// screen names
const homeName = "Home"
const accountName = "Account"
const habitsName = "Habits"

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? "home" : "home-outline"
                    } else if (rn === accountName) {
                        iconName = focused ? "info" : "info-outline"
                    } else if (rn === habitsName) {
                        iconName = focused ? "list" : "list-outline"
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
            })}
            tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "grey",
                lavelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height:70 }
            }}
            
            >

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={accountName} component={AccountScreen}/>
                <Tab.Screen name={habitsName} component={HabitsScreen}/>

            </Tab.Navigator>

        </NavigationContainer>
      
    )
}