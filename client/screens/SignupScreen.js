import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const navigation = useNavigation();

  const handleSave = () => {
    // Implement save logic here

    // Navigate to SelectHabits screen
    navigation.navigate('SelectHabits');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signup</Text>
      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
}
