import { Tabs, useNavigation } from 'expo-router';
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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
