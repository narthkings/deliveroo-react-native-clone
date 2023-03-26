import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import "react-native-url-polyfill/auto";
import RestaurantScreen from "./screens/RestaurantScreen";
import {RootStackParamList} from "./types";
import {Provider} from "react-redux";
import {store} from "./store/store";
import BasketScreen from "./screens/BasketScreen";
import PreparingScreen from "./screens/PreparingScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{presentation: "modal", headerShown: false}}
            />

            <Stack.Screen
              name="Preparing"
              component={PreparingScreen}
              options={{presentation: "fullScreenModal", headerShown: false}}
            />

            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{presentation: "fullScreenModal", headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
