import Community from "../views/Community";
import Favorites from "../views/Favorites";
import Search from "../views/Search";
import Detail from "../views/Detail";

export const navigationConfig = {
  initialRouteName: "search",
  iconsSize: 22,
  tabBarOptions: {
    inactiveTintColor: "#CC0000",
    activeTintColor: "#ffffff",
    style: {
      backgroundColor: "#ff0000", //color you want to change
    },
  },
  headerBarOptions: {
    headerStyle: {
      backgroundColor: "#ff0000",
    },
    headerTintColor: "#fff",
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
      ],
    },
    {
      name: "Community",
      icon: "users",
      views: [
        {
          name: "Community",
          component: Community,
        },
      ],
    },
  ],
};
