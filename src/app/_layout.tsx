import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  const color = useColorScheme();
  console.log(color);
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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
    </ClerkProvider>
  );
}
