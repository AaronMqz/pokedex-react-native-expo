import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import LanguageComponent from "../components/LanguageComponent";
import { getMyFavorites } from "../redux/pokemonDuck";

const { width } = Dimensions.get("window");

const Type = ({ types }) => {
  return (
    <React.Fragment>
      {types.map((type, index) => {
        return (
          <View key={index} style={styles.TypeStyle}>
            <Text style={styles.TypeStyleText}>{type.type.name}</Text>
          </View>
        );
      })}
    </React.Fragment>
  );
};

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.pokemonReducer.myFavorites);

  useEffect(() => {
    if (myFavorites.length === 0) {
      dispatch(getMyFavorites());
    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { pokemon: item })}
      >
        <View style={styles.Card}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.CardHeaderTitleNumber}>
              #{item.id.toString().padStart(3, "0")}
            </Text>
            <Text style={styles.CardTitle}>{item.name}</Text>
            <View style={styles.CardHeaderSubtitle}>
              <Type types={item.types} />
            </View>
          </View>
          <Image
            source={{ uri: item.spriteDeafult }}
            style={styles.CardImage}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <LanguageComponent />
      <FlatList
        data={myFavorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={1}
        /*columnWrapperStyle={{
          marginTop: 5,
          marginLeft: 2,
          marginRight: 2,
        }}*/
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Card: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: width - 20,
    height: width / 3,
    marginTop: 10,
    marginRight: 2,
    marginLeft: 2,
    marginBottom: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 6,
  },
  CardTitle: {
    color: "#000",
    fontSize: 25,
    marginLeft: 10,
    //alignSelf: "center",
  },
  CardImage: {
    height: "100%",
    aspectRatio: 1,
  },
  CardHeaderTitleNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  CardHeaderSubtitle: {
    flexDirection: "row",
    marginLeft: 10,
  },
  TypeStyle: {
    backgroundColor: "red",
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 3,
    marginRight: 5,
    marginTop: 5,
    height: 30,
    justifyContent: "center",
  },
  TypeStyleText: {
    color: "#fff",
  },
});

export default Favorites;
