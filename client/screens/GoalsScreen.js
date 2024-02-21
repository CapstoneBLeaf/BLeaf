import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { useGetGoalsByIdQuery, useDeleteGoalMutation } from "../api/bleafApi";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { selectCurrentUser } from "../actions/tokenSlice";
import Notification from "./components/Notification";

const GoalsScreen = () => {
  const user = useSelector(selectCurrentUser);
  const userId = user.id;
  const { data: goalData, isLoading: isLoading } = useGetGoalsByIdQuery(userId);
  const [deleteGoal] = useDeleteGoalMutation();
  console.log("Goals", goalData);
  if (isLoading) {
    return <Text className="loading">Loading...</Text>;
  }

  return (
    <ScrollView
      style={styles.goalView}
      automaticallyAdjustKeyboardInsets={true}
    >
      {goalData.length > 0 ? (
        goalData.map((goal) => {
          return (
            <View style={styles.goalContainer} key={goal.goalId}>
              <Image style={styles.image} source={{ uri: `${goal.image}` }} />
              <View style={styles.goalDetails}>
                <Text style={styles.name}>Habit: {goal.name}</Text>
                <Text style={styles.frequency}>
                  Frequency: {goal.frequency}
                </Text>
                <Text style={styles.statement}>
                  Motivation: {goal.statement}
                </Text>
              </View>
              <Ionicons
                style={styles.deleteButton}
                name="trash-outline"
                onPress={() => deleteGoal(goal.goalId)}
              />
            </View>
          );
        })
      ) : (
        <SafeAreaView>
          <Text style={styles.error}>Goals Not Found</Text>
        </SafeAreaView>
      )}
      <Notification />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  goalView: {
    flex: 1,
    backgroundColor: "#58e4dc",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  noGoalsText: {
    fontSize: 16,
    color: "gray",
  },
  goalContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    rowGap: 10,
    borderRadius: 10, // Add borderRadius for square shape
  },
  goalDetails: {
    flex: 1,
    marginLeft: 10,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    height: 80, 
    width: 80, 
    borderRadius: 5,
  },

  deleteButton: {
    color: "black",
    fontSize: 24,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default GoalsScreen;
