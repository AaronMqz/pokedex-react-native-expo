import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import Navigation from "./app/navigation";

let WithNavigation = () => (
  <NavigationContainer>
    <Navigation />
  </NavigationContainer>
);

export default function App() {
  StatusBar.setBarStyle("dark-content", true);
  return <WithNavigation />;
}
