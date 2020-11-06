import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import LanguageComponent from "../components/LanguageComponent";
import { saveMyFavorite } from "../redux/pokemonDuck";

const Favorites = () => {
  const [newRouteTitle, setNewRouteTitle] = useState("");
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.pokemonReducer.myFavorites);

  const onSave = (value) => {
    console.log("saving", value);
    //dispatch(saveMyFavorite(value))
  };

  return (
    <SafeAreaView style={styles.Container}>
      <LanguageComponent />
      <Text>Favorites</Text>
      <TextInput
        style={styles.ModalTextInput}
        placeholder={"Enter name before saving"}
        placeholderTextColor={"grey"}
        value={newRouteTitle}
        onChangeText={(text) => setNewRouteTitle(text)}
      />
      <TouchableHighlight
        style={styles.ModalSave}
        onPress={() => onSave(newRouteTitle)}
      >
        <Text style={styles.ModalSaveText}>Save</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ModalTextInput: {
    borderBottomWidth: 2,
    borderColor: "#2ecc71",
    width: "90%",
    textAlign: "center",
    fontSize: 20,
  },
  ModalSave: {
    position: "absolute",
    bottom: 20,
    height: 55,
    width: "90%",
    backgroundColor: "#2ecc71",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
});

export default Favorites;
