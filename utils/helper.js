import { Notifications } from "expo";
import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Flashcards:notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Mobile Flashcards Reminder",
    body: "👋 Don't forget to study for today!",
    ios: {
      sound: true,
    },
    android: {
      sticky: false,
      color: "red",
    },
  };
}



export function setLocalNotification() {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate()+1);
  tomorrow.setHours(20);
  tomorrow.setMinutes(0);

  Notifications.scheduleLocalNotificationAsync(createNotification(), {
    time: tomorrow,
    repeat: "day",
  });
}
