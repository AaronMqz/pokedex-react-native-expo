import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ButtonGroup } from "react-native-elements";
import { changeLanguage } from "../redux/pokemonDuck";
import { useSelector, useDispatch } from "react-redux";
import { themeColors } from "../utils/colors";

const OptionsComponent = ({ handleChangeLanguage, index }) => {
  return (
    <ButtonGroup
      onPress={handleChangeLanguage}
      selectedIndex={index}
      buttons={["EN", "ES"]}
      innerBorderStyle={{ color: "#fff" }}
      selectedButtonStyle={{ backgroundColor: themeColors.primary }}
      buttonStyle={{ backgroundColor: "#B0BEC5" }}
      textStyle={{ color: "#CFD8DC" }}
      containerStyle={{ height: 28, width: 85 }}
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
