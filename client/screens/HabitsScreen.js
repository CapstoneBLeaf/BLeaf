import React, { useState, useEffect } from "react";
import { connect } from "react-redux"; // Import connect from react-redux
import { SafeAreaView, Text, FlatList, TouchableOpacity, View, StyleSheet, ScrollView, Button, Modal, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { bleafApi, useGetAllHabitsQuery } from "../api/bleafApi";

// Import any necessary action creators here

function HabitsScreen(props) {
  const { data: habits, error, isLoading } = useGetAllHabitsQuery();
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalFrequency, setGoalFrequency] = useState("");
  const [motivatingStatement, setMotivatingStatement] = useState("");
  const [timesPerDay, setTimesPerDay] = useState("");
  const navigation = useNavigation();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const toggleHabitSelection = (habit) => {
    const isSelected = selectedHabits.some((h) => h.id === habit.id);
    if (isSelected) {
      setSelectedHabits(selectedHabits.filter((h) => h.id !== habit.id));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  const clearSelectedHabits = () => {
    setSelectedHabits([]);
  };

  const setGoal = () => {
    setModalVisible(true);
  };

  const saveGoal = () => {
    const newGoal = {
      frequency: goalFrequency,
      statement: motivatingStatement,
      timesPerDay: timesPerDay
    };
    console.log("New Goal:", newGoal);
    setModalVisible(false);
  };

  const navigateToGoalsPage = () => {
    navigation.navigate('Goals');
  };

  const renderHabitItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleHabitSelection(item)}>
      <View style={[styles.habitContainer, selectedHabits.some((h) => h.id === item.id) && styles.selectedHabit]}>
        <Text style={styles.habitDetails}>
          <Text style={styles.habitName}>Name: {item.name}</Text>{"\n"}
          <Text style={styles.habitDescription}>Description: {item.description}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Habit Selection</Text>

      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.buttonContainer}>
        {selectedHabits.length > 0 && (
          <>
            <Button title="Clear" onPress={clearSelectedHabits} />
            <Button title="Set Goal" onPress={setGoal} />
            <Button title="Check-in" onPress={navigateToGoalsPage} />
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.input, { color: '#000', backgroundColor: '#ffffff' }]}
              placeholder="Enter Goal Frequency"
              placeholderTextColor="#999999" // Set placeholder text color to gray
              onChangeText={text => setGoalFrequency(text)}
            />
            <TextInput
              style={[styles.input, { color: '#000', backgroundColor: '#ffffff' }]}
              placeholder="Enter Motivating Statement"
              placeholderTextColor="#999999" // Set placeholder text color to gray
              onChangeText={text => setMotivatingStatement(text)}
            />
            <TextInput
              style={[styles.input, { color: '#000', backgroundColor: '#ffffff' }]}
              placeholder="Enter Times Per Day"
              placeholderTextColor="#999999" // Set placeholder text color to gray
              onChangeText={text => setTimesPerDay(text)}
              keyboardType="numeric"
            />

            <Button title="Save Goal" onPress={saveGoal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  habitContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  habitDetails: {
    fontSize: 16,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  habitDescription: {
    fontSize: 16,
  },
  selectedHabit: {
    backgroundColor: '#64b5f6',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 200,
  },
});

// Connect the component to Redux store
export default connect()(HabitsScreen);
