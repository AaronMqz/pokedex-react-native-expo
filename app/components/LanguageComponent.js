import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ButtonGroup } from "react-native-elements";
import { changeLanguage } from "../redux/pokemonDuck";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../languages/i18n";

const OptionsComponent = ({ handleChangeLanguage, index }) => {
  return (
    <ButtonGroup
      onPress={handleChangeLanguage}
      selectedIndex={index}
      buttons={["EN", "ES"]}
      innerBorderStyle={{ color: "#fff" }}
      selectedButtonStyle={{ backgroundColor: "red" }}
      containerStyle={{ height: 30, width: 80 }}
    />
  );
};

const LanguageComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentLanguageIndex = useSelector(
    (state) => state.pokemonReducer.currentLanguageIndex
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <OptionsComponent
          index={currentLanguageIndex}
          handleChangeLanguage={handleChangeLanguage}
        />
      ),
    });
  }, [navigation, currentLanguageIndex]);

  const handleChangeLanguage = (index) => {
    dispatch(changeLanguage(index));
  };
  return null;
};

export default LanguageComponent;
