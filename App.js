import React, { Component } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { AppRegistry } from "react-native";
import searchReducer from "./redux/reducers/searchReducer";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import DetailScreen from "./screens/detailScreen";
import AppContainer from "./containers/appContainer";
import FavouriteScreen from "./containers/favContainer";
import { MaterialIcons } from "react-native-vector-icons";

const SearchTab = createStackNavigator(
  {
    Search: { 
      screen: AppContainer,
      navigationOptions: () => ({
        title: "New Movie Browser",
      }),
    },
    Details: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: "Search", 
  }
);

const AppNavigator = createBottomTabNavigator({
  Movies: {
    screen: SearchTab,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name="movie"
          size={26}
          color={focused ? "black" : tintColor}
        />
      ),
    }),
  },
  Favourites: {
    screen: FavouriteScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name="favorite"
          size={26}
          color={focused ? "red" : tintColor}
        />
      ),
    }),
  },
},
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 13,
      },
    }
  }
);

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleWare(searchReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("AsyncReduxMovieBrowser", () => App);
