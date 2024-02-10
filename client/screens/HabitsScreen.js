import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";

export default function HabitsScreen() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/habits");
        if (response.ok) {
          const data = await response.json();
          setHabits(data);
        } else {
          console.error("Failed to fetch habits");
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <SafeAreaView>
      <Text>HabitsScreen</Text>

      <FlatList
        data={habits}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
