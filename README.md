# Pokedex React Native Expo

React Native app using the [Pokedex API](https://pokeapi.co)

## Features

- Display Pokemons provided by the [Pokedex API](https://pokeapi.co/​) in a Grid View
- Search bar
- Button on top to reset the grid view
- Tab Navigation with Search and Favorites options, the navigation stack is using my [navigation template](https://github.com/AaronMqz/react-native-navigation-template-expo)
- Detail View with more Pokemon information 
- Pagination when ScrollDown 
- Button in Detail View to Save my favorite Pokemon
- Favorite Screen to display all favorites Pokemon
- Button on top for Internationalization with i18n, English/Spanish
- LocalStorage
- Custom colors depending on the type of Pokemon
- Some test cases using Jest


Built using:
- React Native Expo
- Hooks: useState, useEffect, useLayoutEffect, useMemo and custom Hooks
- Redux/Redux-Thunk using Duck pattern approach
- React DevTools Extension
- Axios
- React Navigation 5
- AsyncStorage
- i18n
- React Native Elements
- Jest for testing


## Getting started

If you don't have expo-cli yet, get it

```bash
npm i -g expo-cli
```

## Project Setup

```bash
git clone https://github.com/AaronMqz/pokedex-react-native-expo.git
cd pokedex-react-native-expo
npm install
npm start
```
## Test Demo 

To test the app you can run in your device using the Expo Client App:

[Pokedex React Native Expo](https://expo.io/@aaronmqz/projects/pokedex-react-native-expo)

## License
[MIT](https://choosealicense.com/licenses/mit/)
