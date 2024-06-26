import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentToken,
  logOut,
  selectCurrentUser,
} from "../actions/tokenSlice";
import { useNavigation } from "@react-navigation/core";
import { useGetUsersByIdQuery, useDeleteUserMutation } from "../api/bleafApi";
import Button from "./components/Button";
import img_arr from "../plants/plants";
import ConfettiCannon from "react-native-confetti-cannon";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function UserScreen() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetUsersByIdQuery(user.id, token);
  const [flowerMessage, setFlowerMessage] = useState("");
  console.log(token);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [deleteUserMutation] = useDeleteUserMutation();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (data.growth_level == 51) {
      setFlowerMessage("Hooray! You grew a flower!");
    } else {
      setFlowerMessage("Grow your flower by completing healthy habits!");
    }
  }, [data]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  console.log("data");
  console.log(JSON.stringify(data));

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    Alert.alert("Logged Out", "You have been successfully logged out.");
    navigation.navigate("Welcome");
  };
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteUserMutation({ id: user.id });
              console.log(user.id);
              Alert.alert("Account Deleted", "Your account has been deleted.");
              navigation.navigate("Welcome");
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };
  if (token) {
    return (
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <SafeAreaView>
          <View style={styles.container}>
            <Text style={styles.name}>
              Hello, {data.firstname} {data.lastname}
            </Text>
            <Image
              source={img_arr[data.growth_level - 1]}
              style={styles.image}
              resizeMode="contain"
            />
            <Text key={flowerMessage}>{flowerMessage}</Text>
            {(data.growth_level === 51 || data.growth_level > 51) && (
              <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
            )}
            <Button title="Logout" onPress={handleLogout} />
            <Button title="Delete Account" onPress={handleDeleteAccount} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  image: {
    height: windowHeight * 0.6,
    width: windowWidth * 0.8,
  },
});
