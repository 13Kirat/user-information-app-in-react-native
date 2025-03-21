import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen name="index" options={{
      headerTitle: "Users Information",
      // headerTintColor: "#222",
      // headerStyle: { backgroundColor: "#bbb" }
    }} />
  </Stack>;
}
