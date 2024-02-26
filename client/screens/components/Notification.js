import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
  requestPermissions: true,
});

export default function Notification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token.data;
  }

  async function scheduleNotification(expoPushToken) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          to: expoPushToken,
          title: "Notification",
          body: title,
          sound: "default",
        },
        trigger: {
          date: time,
        },
      });
      // If scheduling succeeds, show success alert
      Alert.alert("Notification scheduled successfully!");
    } catch (error) {
      // If scheduling fails, show error alert
      Alert.alert("Failed to schedule notification. Please try again.");
      console.error(error);
    }
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };
  return (
    <>
      <Text style={styles.title}>Set Your Reminder</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Label Reminder"
        style={styles.input}
      />
      <View style={styles.time}>
        <Button title="Select Time" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <Button
        title="Schedule Reminder"
        onPress={async () => {
          await scheduleNotification(expoPushToken);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 45,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f3f3f4",
    borderRadius: 10,
    width: "100%",
  },
  title: {
    marginBottom: 10,
  },
  time: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
