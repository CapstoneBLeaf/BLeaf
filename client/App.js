import store from "./app/store.js";
import AppNavigation from "./navigation/appNavigation.js"
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from 'react';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation/>
      </SafeAreaProvider>
    </Provider>
  );
}  