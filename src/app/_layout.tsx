import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

export default function RootLayout() {
  const color = useColorScheme();
  return (
    <>
      <StatusBar
        barStyle={color != "light" ? "light-content" : "dark-content"}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0a0a0f" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="seeker"
          options={{
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="giver"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
