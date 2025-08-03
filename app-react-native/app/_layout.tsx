import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ConvexReactClient } from "convex/react";
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useColorScheme } from '@/hooks/useColorScheme';
import * as SecureStore from 'expo-secure-store';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string);

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [hasOnboarded, setHasOnboarded] = useState<Boolean>(false);
  const [loaded] = useFonts({
    Ubuntu: require('../assets/fonts/Ubuntu-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // AsyncStorage.getItem('onboarded')
    //     .then(value => {
    //       if (value === null) {
    //         AsyncStorage.setItem('onboarded', 'true');
    //         setHasOnboarded(true);
    //       } else {
    //         setHasOnboarded(true);
    //       }
    // });
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!publishableKey) {
    throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ClerkProvider publishableKey={publishableKey}>
        <ClerkLoaded>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false}}/>
                <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }}/>
                <Stack.Screen name="+not-found" options={{ headerShown: false, gestureEnabled: false }}/>
              </Stack>
          </ConvexProviderWithClerk>
        </ClerkLoaded>
      </ClerkProvider>
    </ThemeProvider>
  );
}
