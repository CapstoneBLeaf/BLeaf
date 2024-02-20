import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // console.log("Registering for push notifications...");
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    })

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
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
      const { status } = 
        await Notifications.requestPermissionsAsync();
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
      title: "my first locally scheduled notification",
      body: "body of scheduled notification",
      data: { data: "username" }
    },
    trigger: {
      seconds: 90
    },
  })


};

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
  })
  // .then(res=>res.text()).then(data=>console.log(data));
}

  return (
    <Provider store={store}>
       <SafeAreaProvider>
       <AppNavigation/>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Your push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button title='Schedule Notification' 
      onPress={async () => {await scheduleNotification(expoPushToken)}} />
      <Button
        title="Press to Send Notification" 
        onPress={async () => {await sendPushNotification(expoPushToken)}} />
    </View>
    </SafeAreaProvider>
    </Provider>
  );
};