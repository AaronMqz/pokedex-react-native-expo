import Favorites from "../views/Favorites";
import Search from "../views/Search";
import Detail from "../views/Detail";
import { themeColors } from "../utils/colors";

export const navigationConfig = {
  initialRouteName: "search",
  iconsSize: 22,
  tabBarOptions: {
    inactiveTintColor: themeColors.secondary,
    activeTintColor: themeColors.activeTintColor,
    style: {
      backgroundColor: themeColors.primary,
    },
  },
  headerBarOptions: {
    headerStyle: {
      backgroundColor: themeColors.primary,
    },
    headerTintColor: themeColors.activeTintColor,
  },
  stacks: [
    {
      name: "Search",
      icon: "search",
      views: [
        {
          name: "Search",
          component: Search,
        },
        {
          name: "Detail",
          component: Detail,
        },
      ],
    },
    {
      name: "Favorites",
      icon: "heart",
      views: [
        {
          name: "Favorites",
          component: Favorites,
        },
        {
          name: "Detail",
          component: Detail,
        },
      ],
    },
  ],
};
