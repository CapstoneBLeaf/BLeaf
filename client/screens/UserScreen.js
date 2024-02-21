import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  logOut,
  selectCurrentUser,
} from "../actions/tokenSlice";
import { useNavigation } from "@react-navigation/core";
import Button from "./components/Button";
import img_arr from "../plants/plants";

export default function UserScreen() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log(token);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function fetchPlantGrowth() {
    if (user.growth_level === 51 ) {
      return "Hooray! You grew a flower!"
    }
    else {
      return "Grow your flower by completing healthy habits!"
    }
  }
  

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logging out");
    dispatch(logOut());
    navigation.navigate("Welcome");
  };

  if (token) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.name}>
          Hello, {user.firstname} {user.lastname}
        </Text>
        <Image source={img_arr[user.growth_level - 1]} />
        <Text>
          {fetchPlantGrowth()}
        </Text>
        <Button title="Logout" onPress={handleLogout} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingRight: 20,
    paddingLeft: 20,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
});
