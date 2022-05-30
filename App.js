// external imports
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// redux
import { legacy_createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// ui-kitten UI Library
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

// local imports
import rootReducer from "./redux/reducers";
import Register from "./screens/Register";
import DashBoard from "./screens/DashBoard";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Notification from "./screens/Notification";
import Login from "./screens/Login";
import Settings from "./screens/Settings";
import DrawerContent from "./screens/Drawer";

// store
const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// stack navigator and screen
const Stack = createNativeStackNavigator();

// drawer navigator and screen
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaView
          style={{ flex: 1, paddingTop: Platform.OS === "android" ? 42 : 0 }}
        >
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}
              initialRouteName="DashBoard"
              screenOptions={{ headerShown: false, drawerType: 'front' }}
            >
              <Drawer.Screen name="DashBoard" component={DashBoard} />
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Notification" component={Notification} />
              <Drawer.Screen name="Profile" component={Profile} />
              <Drawer.Screen name="EditProfile" component={EditProfile} />
              <Drawer.Screen name="Register" component={Register} />
              <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
          </NavigationContainer>

          <StatusBar barStyle="dark-content" backgroundColor="#F4F5F6" />
        </SafeAreaView>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
