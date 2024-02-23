import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { useGetGoalsByIdQuery, useDeleteGoalMutation } from "../api/bleafApi";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { selectCurrentUser } from "../actions/tokenSlice";
import Notification from "./components/Notification";
import Button from "./components/Button";

const GoalsScreen = () => {
  const user = useSelector(selectCurrentUser);
  const [modalVisible, setModalVisible] = useState(false);
  const userId = user.id;
  const { data: goalData, isLoading: isLoading } = useGetGoalsByIdQuery(userId);
  const [deleteGoal] = useDeleteGoalMutation();
  if (isLoading) {
    return <Text className="loading">Loading...</Text>;
  }
  const handleReminder = async (e) => {
    setModalVisible(true);
  };
  return (
    <ScrollView
      style={styles.goalView}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={styles.container}>
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
            <Text style={styles.error}>
              No goals set yet. Go to the habits page to get started and set
              reminder as well!
            </Text>
          </SafeAreaView>
        )}
        {goalData.length > 0 && (
          <>
            <Button title="Set Reminder" onPress={handleReminder} />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.centeredView}>
                <View style={styles.modal}>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons style={styles.close} name="close-outline" />
                  </Pressable>
                  <Notification />
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>
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
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    rowGap: 10,
    borderRadius: 10,
  },
  container: {
    padding: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modal: {
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
    justifyContent: "center",
    display: "flex",
  },
  deleteButton: {
    color: "black",
    fontSize: 24,
  },
  close: {
    color: "black",
    fontSize: 24,
    alignItems: "flex-end",
    position: "absolute",
    right: -10,
    top: -10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default GoalsScreen;
