import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LevelProvider } from "./context/LevelContext";

import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./screens/LoadingScreen";
import LevelSelectionScreen from "./screens/LevelSelectionScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    loadResources();
  }, []);

  return (
    <LevelProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLoading ? (
            // Muestra 'LoadingScreen' mientras 'isLoading' sea verdadero
            <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
          ) : (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Rompecabezas de la mente: La dislexia y su solución'}}/>
              <Stack.Screen name="GameScreen" component={GameScreen} options={{title: 'Juego'}}/>
              <Stack.Screen name="LevelSelectionScreen" component={LevelSelectionScreen} options={{title: 'Niveles'}}/>
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{title: 'Ajustes'}}/>          
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LevelProvider>
  );
}