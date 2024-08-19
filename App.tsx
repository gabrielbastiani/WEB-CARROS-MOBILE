import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F3f5f8" barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
  )
}
