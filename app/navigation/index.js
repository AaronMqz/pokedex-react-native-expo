import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

import { navigationConfig } from "./navigationConfig";

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const {
    initialRouteName,
    stacks,
    tabBarOptions,
    iconsSize,
    headerBarOptions,
  } = navigationConfig;
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBarOptions={tabBarOptions}
    >
      {stacks.map((stack, index) => {
        return (
          <Tab.Screen
            key={index}
            name={stack.name}
            component={CreateStack(stack.views, headerBarOptions)}
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name={stack.icon} size={iconsSize} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const CreateStack = (views, headerBarOptions) => {
  const Stack = createStackNavigator();

  const StackScreen = () => {
    return (
      <Stack.Navigator>
        {views.map((view, index) => {
          return (
            <Stack.Screen
              key={index}
              name={view.name}
              component={view.component}
              options={headerBarOptions}
            />
          );
        })}
      </Stack.Navigator>
    );
  };
  return StackScreen;
};

export default Navigation;
