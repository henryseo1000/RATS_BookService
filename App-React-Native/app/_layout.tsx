import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Ubuntu: require('../assets/fonts/Ubuntu-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ConvexProvider client={convex}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false}} />
          <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }}/>
          <Stack.Screen name="+not-found" />
        </Stack>
      </ConvexProvider>
    </ThemeProvider>
  );
}
