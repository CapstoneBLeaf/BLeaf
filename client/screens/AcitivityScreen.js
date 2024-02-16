import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useListCheckInQuery, useRemoveCheckInMutation } from "../api/bleafApi";
import { selectCurrentUser } from "../actions/tokenSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function AcitivityScreen() {
  const user = useSelector(selectCurrentUser);
  const userId = user.id;
  const { data: habitData, isLoading: isLoading } = useListCheckInQuery(userId);
  const [removeCheckIn] = useRemoveCheckInMutation();
  if (isLoading) {
    return <Text className="loading">Loading...</Text>;
  }

  async function handleRemoveCheckIn(id) {
    try {
      await removeCheckIn({ id, userId });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView
      key={styles.activityarea}
      automaticallyAdjustKeyboardInsets={true}
    >
      {habitData ? (
        <>
          {habitData.map((checkin) => (
            <View key={checkin.activityId} style={styles.content}>
              <View style={styles.leftcontent}>
                <Image
                  style={styles.image}
                  source={{ uri: `${checkin.image}` }}
                />
                <Text>{checkin.name}</Text>
              </View>
              <Ionicons
                onPress={() => handleRemoveCheckIn(checkin.id)}
                style={styles.icon}
                name="trash-outline"
              />
            </View>
          ))}
        </>
      ) : (
        <Text>No more habits</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityarea: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    height: 60,
    width: 60,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "pink",
    padding: 10,
    marginBottom: 10,
  },
  leftcontent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});
