import { Stack, Tabs, useNavigation } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useConvexAuth } from 'convex/react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const { isAuthenticated } = useConvexAuth();

  if (isAuthenticated) {
    navigation.navigate("(tabs)" as never);
    return;
  }
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen
        options={{
          title: 'onboarding1',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
