import React, { useState } from "react";
import { connect } from "react-redux"; 
import { SafeAreaView, Text, FlatList, TouchableOpacity, View, StyleSheet, Image, Button, Modal, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useGetAllHabitsQuery } from "../api/bleafApi";

function HabitsScreen(props) {
  const { data: habits, error, isLoading } = useGetAllHabitsQuery();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalFrequency, setGoalFrequency] = useState("");
  const [motivatingStatement, setMotivatingStatement] = useState("");
  const [goals, setGoals] = useState([]);
  const navigation = useNavigation();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const toggleHabitSelection = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true); // Show the modal when a habit is selected
  };

  const clearSelectedHabits = () => {
    setSelectedHabit(null);
    setModalVisible(false); // Hide the modal when clearing selected habits
  };

  const saveGoal = () => {
    const newGoal = {
      frequency: goalFrequency,
      statement: motivatingStatement,
    };
    setGoals([...goals, newGoal]); // Add the new goal to the list of goals
    console.log("New Goal:", newGoal);
    // Here you can dispatch an action to save the new goal
    setModalVisible(false);
  };

  const navigateToGoalsPage = () => {
    navigation.navigate('Goals', { goals: goals }); // Pass the list of goals to the GoalsScreen
  };

  const renderHabitItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleHabitSelection(item)}>
      <View style={[styles.habitContainer, selectedHabit && selectedHabit.id === item.id && styles.selectedHabit]}>
        <Text style={styles.habitDetails}>
          <Text style={styles.habitName}>Name: {item.name}</Text>{"\n"}
          <Text style={styles.habitDescription}>Description: {item.description}</Text>{"\n"}
          <Image style={styles.image} source={{uri:`${item.image}`}}/></Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={habits}
        renderItem={renderHabitItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={clearSelectedHabits} />
        <Button title="Check-in" onPress={navigateToGoalsPage} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[styles.radioOption, goalFrequency === "1 x day" && styles.radioSelected]}
                onPress={() => setGoalFrequency("1 x day")}
              >
                <Text>1 x day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioOption, goalFrequency === "2 x day" && styles.radioSelected]}
                onPress={() => setGoalFrequency("2 x day")}
              >
                <Text>2 x day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioOption, goalFrequency === "3 x day" && styles.radioSelected]}
                onPress={() => setGoalFrequency("3 x day")}
              >
                <Text>3 x day</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioOption, goalFrequency === "4 x day" && styles.radioSelected]}
                onPress={() => setGoalFrequency("4 x day")}
              >
                <Text>4 x day</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, { color: '#000', backgroundColor: '#ffffff' }]}
              placeholder="Enter Motivating Statement"
              placeholderTextColor="#999999" // Set placeholder text color to gray
              onChangeText={text => setMotivatingStatement(text)}
            />

            <View style={styles.buttonRow}>
              <Button title="Back" onPress={() => setModalVisible(false)} />
              <Button title="Add Goal" onPress={saveGoal} />
            </View>
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
    marginBottom:10,
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
  image:{
    height: 100,
    width: 100,
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  radioOption: {
    borderWidth: 1,
    borderColor: '#999999',
    padding: 10,
    borderRadius: 5,
  },
  radioSelected: {
    backgroundColor: '#64b5f6',
    borderColor: '#64b5f6',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default connect()(HabitsScreen);
