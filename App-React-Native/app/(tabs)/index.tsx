import { View, StyleSheet, Text } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
      flex: 1, 
      width: "100%", 
      height: "100%", 
      justifyContent: "center", 
      alignItems: "center"
  },
  text : {
      
  }
});
