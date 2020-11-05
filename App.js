import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import Store from "./app/redux/store";
import Navigation from "./app/navigation";

let store = Store();

let WithNavigation = () => (
  <NavigationContainer>
    <Navigation />
  </NavigationContainer>
);

let WithStore = () => (
  <Provider store={store}>
    <WithNavigation />
  </Provider>
);

export default function App() {
  StatusBar.setBarStyle("dark-content", true);
  return <WithStore />;
}
