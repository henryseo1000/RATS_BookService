import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnBoarding2() {
    const navigation = useNavigation();

    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            navigation.dispatch(e.data.action);
        });
    }, []);
    
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Go Now! EnJoy!</Text>

      <View style={styles.button_area}>

        <View style={styles.button}>
          <Ionicons name="arrow-back" color={"white"} size={30}/>
          <Button title="Prev" onPress={() => {navigation.goBack()}} color={"white"}/>
        </View>

        <View style={styles.button}>
          <Button title='Get Started' 
            color={"white"}
            onPress={() => {
            navigation.navigate("Login")
            }}/>
            <Ionicons name="arrow-forward" color={"white"} size={30}/>
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#182D52",
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 30
  },
  title: {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    color: "white",
    fontSize: 50
  },
  phrase: {
    fontFamily: "Ubuntu",
    color: "white",
    fontSize: 30
  },
  button_area: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row"
  }
})