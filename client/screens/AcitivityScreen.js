import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { useListCheckInQuery } from "../api/bleafApi";
import { selectCurrentUser } from "../actions/tokenSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AcitivityScreen() {
  const user = useSelector(selectCurrentUser);
  const userId = user.id;
  const { data: habitData, isLoading: isLoading } = useListCheckInQuery(userId);

  const [date, setDate] = useState(new Date());
  const filteredData = habitData?.filter((checkin) => {
    if (!date) return true; // If no date selected, return all data
    const isoStr = checkin.completed_at;
    const idate = new Date(isoStr);
    return idate.toDateString() === date.toDateString();
  });
  if (habitData) {
    filteredData.sort((a, b) => {
      return new Date(b.completed_at) - new Date(a.completed_at);
    });
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  if (isLoading) {
    return <Text className="loading">Loading...</Text>;
  }

  return (
    <ScrollView
      style={styles.activityarea}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={styles.container}>
        {habitData ? (
          <>
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Filter by Date:</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                is24Hour={false}
                onChange={onChange}
              />
            </View>
            {filteredData.length > 0 ? (
              filteredData.map((checkin) => {
                const isoStr = checkin.completed_at;
                const date = new Date(isoStr);
                var time = date.toLocaleTimeString("en-US", { hour12: true });
                return (
                  <View key={checkin.activityId} style={styles.content}>
                    <View style={styles.leftcontent}>
                      <Image
                        style={styles.image}
                        source={{ uri: `${checkin.image}` }}
                      />
                      <Text style={styles.name}>{checkin.name}</Text>
                    </View>
                    <Text style={styles.time}>{time}</Text>
                  </View>
                );
              })
            ) : (
              <SafeAreaView>
                <Text style={styles.error}>
                  No checkin habits for selected date.Go to the habits page to
                  get started!
                </Text>
              </SafeAreaView>
            )}
          </>
        ) : (
          <SafeAreaView>
            <Text style={styles.error}>
              No Habits checkin yet. Go to the habits page to get started!
            </Text>
          </SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityarea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    height: 60,
    width: 60,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    paddingLeft: 10,
  },
  time: {
    color: "blue",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#58e4dc",
    padding: 10,
    marginBottom: 10,
  },
  leftcontent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  filterLabel: {
    marginRight: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
