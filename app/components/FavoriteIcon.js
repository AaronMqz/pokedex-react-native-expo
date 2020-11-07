import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FavoriteIcon = ({ isFavorite, onPress }) => {
  const handleOnPress = () => {
    onPress(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress()}>
      <FontAwesome
        name={isFavorite ? "heart" : "heart-o"}
        size={35}
        color={isFavorite ? "red" : "#eee"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteIcon;
