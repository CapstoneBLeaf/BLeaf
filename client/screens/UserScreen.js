import { SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  logOut,
  selectCurrentUser,
} from "../actions/tokenSlice";
import { useNavigation } from "@react-navigation/core";
import Button from "./components/Button";

export default function UserScreen() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  console.log(token);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    dispatch(logOut());
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>
        Hello {user.firstname} {user.lastname}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
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
});
