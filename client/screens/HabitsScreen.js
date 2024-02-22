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
  Modal,
  TextInput,
  Button,
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
          <Text style={styles.habitName}>{item.name}</Text>
          {"\n"}
          {"\n"}
          <Text style={styles.habitDescription}>{item.description}</Text>
          {"\n"}
          {"\n"}
          <Image style={styles.image} source={{ uri: `${item.image}` }} />
          {"\n"}
          {"\n"}
          <TouchableOpacity
            onPress={() => {
              handleCheckIn(item.id);
            }}
            style={styles.check}
          >
            <Text style={styles.title}>Check-In</Text>
          </TouchableOpacity>
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
              placeholderTextColor="#999999" 
              onChangeText={(text) => setStatement(text)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleAddGoals} style={styles.btn}>
                <Text style={styles.title}>Add Goal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.btn}
              >
                <Text style={styles.title}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#58e4dc",
    flex: 1,
  },
  habitContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  habitDetails: {
    fontSize: 16,
  },
  habitName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 0,
  },
  habitDescription: {
    fontSize: 16,
  },
  selectedHabit: {
    backgroundColor: "#64b5f6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#2c2cff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 5,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "auto",
    justifyContent: "center",
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  check: {
    backgroundColor: "#2c2cff",
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    color: "white",
  },
  btn: {
    backgroundColor: "#2c2cff",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

export default connect()(HabitsScreen);
