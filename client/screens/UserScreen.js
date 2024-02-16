import { SafeAreaView, Text, StyleSheet, View, Image, ImageBackground } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  logOut,
  selectCurrentUser,
} from "../actions/tokenSlice";
import { useNavigation } from "@react-navigation/core";
import Button from "./components/Button";
import { useGetUsersByIdQuery } from "../api/bleafApi";

export default function UserScreen() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log(token);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const plant_image = require(user.plant_image);


  const growingPlant = (plant) => {
    // add rendering plant img  
    // add growth plant logic (if (days of check ins increases) then growthLevel++)
  };

  const handleLogout = async(e) => {
    e.preventDefault();
    console.log("logging out")
    dispatch(logOut());
    navigation.navigate("Welcome");
  } 


  if (token) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.name}>
            Hello, {user.firstname} {user.lastname}
          </Text>
          {/* <Image source={plant_image}/> */}
          <Text>Done for the day?</Text>
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


{/* <>
<p>Done for the day?</p>
{ Cookies.get("token") ? (<button id="logout-button" onClick={handleClick}>
  Log out
</button>) : null }
</> */}