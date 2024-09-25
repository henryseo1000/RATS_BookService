import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Header from '@/components/navigation/Header';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#f1f1f1",
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { position: 'absolute' },
        tabBarLabelPosition: "below-icon",
        tabBarAllowFontScaling: true,
        headerShown: false
      }}>
      <Tabs.Screen
        name="home"
        options={{
          header: () => <Header/>,
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="star"
        options={{
          header: () => <Header/>,
          title: 'Star',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="share"
        options={{
          header: () => <Header/>,
          title: 'Share',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'share' : 'share-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          header: () => <Header/>,
          title: 'My Book',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
