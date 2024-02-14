import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

const GoalsScreen = ({ route, navigation }) => {
  const { goals } = route.params;

  if (!goals || goals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noGoalsText}>No goals selected</Text>
      </View>
    );
  }

  const removeHabit = (index) => {
    const updatedGoals = [...goals];
    updatedGoals.splice(index, 1);
    navigation.setParams({ goals: updatedGoals });
  };
const renderGoalItem = ({ item, index }) => (
  <View style={styles.goalContainer}>
    <TouchableOpacity onPress={() => removeHabit(index)} style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
    <Image style={styles.image} source={{ uri: item.habit.image }} />
    <View style={styles.goalDetails}>
      <Text style={styles.goalText}>Habit: {item.habit.name}</Text>
      <Text style={styles.goalText}>Frequency: {item.frequency}</Text>
      <Text style={styles.goalText}>Motivation: {item.statement}</Text>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goals Screen</Text>
      <FlatList
        data={goals}
        renderItem={renderGoalItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#29eecb",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    width: 336, // Set a fixed width for the container
    height: 120, // Set a fixed height for the container
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
    height: 80, // Adjusted height
    width: 80, // Adjusted width
    borderRadius: 5, // Add borderRadius to match the container
  },
    
    deleteButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  
export default GoalsScreen;
