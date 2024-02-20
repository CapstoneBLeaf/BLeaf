import React, { useState } from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Button,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  useGetAllHabitsQuery,
  useCheckInMutation,
  useCreateGoalsMutation,
} from "../api/bleafApi";
import { selectCurrentUser } from "../actions/tokenSlice";

function HabitsScreen(props) {
  const { data: habits, error, isLoading } = useGetAllHabitsQuery();
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [statement, setStatement] = useState("");
  const [checkInHabit] = useCheckInMutation();
  const [addGoals] = useCreateGoalsMutation();
  const navigation = useNavigation();
  const user = useSelector(selectCurrentUser);
  const userId = user.id;
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  async function handleCheckIn(id) {
    try {
      console.log(id, userId);
      const response = await checkInHabit({ id, userId });
      console.log("responsech:", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleHabitSelection = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true); // Show the modal when a habit is selected
  };

  const clearSelectedHabits = () => {
    setSelectedHabit(null);
    setModalVisible(false); // Hide the modal when clearing selected habits
  };

  async function handleAddGoals() {
    try {
      const response = await addGoals({
        frequency,
        statement,
        userId,
        habitId: selectedHabit.id,
      }).unwrap();
      setFrequency("");
      setStatement("");
      console.log("responsegg:", response);
      navigation.navigate("Goals");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }

  const renderHabitItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleHabitSelection(item)}>
      <View
        style={[
          styles.habitContainer,
          selectedHabit && selectedHabit.id === item.id && styles.selectedHabit,
        ]}
      >
        <Text style={styles.habitDetails}>
          <Text style={styles.habitName}>Name: {item.name}</Text>
          {"\n"}
          <Text style={styles.habitDescription}>
            Description: {item.description}
          </Text>
          {"\n"}
          <Image style={styles.image} source={{ uri: `${item.image}` }} />{" "}
          {"\n"}
          <Button
            title="Check-in"
            onPress={() => {
              handleCheckIn(item.id);
            }}
          />
        </Text>
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
                style={[
                  styles.radioOption,
                  frequency === "Daily" && styles.radioSelected,
                ]}
                onPress={() => setFrequency("Daily")}
              >
                <Text>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  frequency === "Weekly" && styles.radioSelected,
                ]}
                onPress={() => setFrequency("Weekly")}
              >
                <Text>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  frequency === "Bi-weekly" && styles.radioSelected,
                ]}
                onPress={() => setFrequency("Bi-weekly")}
              >
                <Text>Bi-weekly</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.input,
                { color: "#000", backgroundColor: "#ffffff" },
              ]}
              placeholder="Enter Motivating Statement"
              placeholderTextColor="#999999" // Set placeholder text color to gray
              onChangeText={(text) => setStatement(text)}
            />

            <View style={styles.buttonRow}>
              <Button title="Back" onPress={() => setModalVisible(false)} />
              <Button title="Add Goal" onPress={handleAddGoals} />
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
    backgroundColor: "#29eecb",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  habitDetails: {
    fontSize: 16,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  habitDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedHabit: {
    backgroundColor: "#64b5f6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  image: {
    height: 100,
    width: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: 230,
    borderRadius: 5,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioOption: {
    borderWidth: 1,
    borderColor: "#999999",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: "#64b5f6",
    borderColor: "#64b5f6",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});

export default connect()(HabitsScreen);
