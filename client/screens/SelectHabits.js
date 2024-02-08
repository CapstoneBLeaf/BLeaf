import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const habitsData = [
  { id: 1, name: "Drink water" },
  { id: 2, name: "Eat fruits and vegetables" },
  { id: 3, name: "Exercise regularly" },
  { id: 4, name: "Get enough sleep" },
  { id: 5, name: "Meditate or practice mindfulness" },
  // Add more habits as needed
];

const SelectHabits = () => {
  const [selectedHabits, setSelectedHabits] = useState([]);

  const toggleHabitSelection = (habitId) => {
    if (selectedHabits.includes(habitId)) {
      setSelectedHabits(selectedHabits.filter((id) => id !== habitId));
    } else {
      setSelectedHabits([...selectedHabits, habitId]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Habits</Text>
      {habitsData.map((habit) => (
        <TouchableOpacity
          key={habit.id}
          style={[
            styles.habitItem,
            selectedHabits.includes(habit.id) && styles.selectedHabit,
          ]}
          onPress={() => toggleHabitSelection(habit.id)}
        >
          <Text style={styles.habitText}>{habit.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  habitItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedHabit: {
    backgroundColor: "#d3d3d3",
  },
  habitText: {
    fontSize: 16,
  },
});

export default SelectHabits;
