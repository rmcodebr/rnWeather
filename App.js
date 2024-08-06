import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screens/HomeScreen";
import ScreenA from "./src/screens/ScreenA";
import ScreenB from "././src/screens/ScreenB";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./src/screens/DetailScreen";
import { DateTimeProvider } from "./src/components/DateTimeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DateTimeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="ScreenA" component={ScreenA} />
          <Stack.Screen name="ScreenB" component={ScreenB} />
        </Stack.Navigator>
      </NavigationContainer>
    </DateTimeProvider>
  );
}
