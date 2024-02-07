import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2c2cff",
    padding: 20,
    width: "100%",
    marginTop: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    color: "white",
  },
});
