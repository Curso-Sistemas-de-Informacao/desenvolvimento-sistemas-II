import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Home";
import UserDetailsScreen from "./src/screens/UserDetail";
import AddUser from "./src/screens/AddUser";
import EditUser from "./src/screens/EditUser";

type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  AddUser: undefined
  EditUser: { userId: number }
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: "Detalhes do Usuário" }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{ title: "Adicionar novo usuário" }}
        />
          <Stack.Screen
          name="EditUser"
          component={EditUser}
          options={{ title: "Editar usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;