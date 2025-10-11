import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MainHeader from '@/components/navigation/MainHeader';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
        header: () => <MainHeader/>,
        tabBarActiveBackgroundColor: "#f1f1f1ff",
        tabBarActiveTintColor: Colors[colorScheme === "dark" ? 'dark' : 'light'].tint,
        tabBarStyle: { position: 'absolute' },
        tabBarLabelPosition: "below-icon",
        tabBarAllowFontScaling: true,
        headerShown: true
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="star"
        options={{
          title: 'Star',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="share"
        options={{
          title: 'Share',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'share' : 'share-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'My Book',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="barcode"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: "none"
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: "none"
          }
        }}
      />
    </Tabs>
    </>    
  );
}