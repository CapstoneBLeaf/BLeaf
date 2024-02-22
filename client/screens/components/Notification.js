import { useState, useEffect, useRef } from "react";
import { Text, View, Button, TextInput, Platform } from "react-native";
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
  // Should the initial notification be popped automatically
  // default: true
  // popInitialNotification: true,
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
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
    // console.log("Registering for push notifications...");
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
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token.data;
  }

  async function scheduleNotification(expoPushToken) {
    Notifications.scheduleNotificationAsync({
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
  }

  //notification message
  async function sendPushNotification(expoPushToken) {
    console.log("Sending push notification...");
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification",
      body: "This is my first notification made with expo rn app!",
      data: { someData: "'goes here'" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "expo.host",
        accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    // .then(res=>res.text()).then(data=>console.log(data));
  }
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(Platform.OS === "ios");
    setTime(currentDate);
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Set Your Reminder</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Label Reminder"
        style={{ borderWidth: 1, padding: 10, margin: 10, width: 200 }}
      />
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
      <Button
        title="Schedule Reminder"
        onPress={async () => {
          await scheduleNotification(expoPushToken);
        }}
      />
    </View>
  );
}
