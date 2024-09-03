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

      <Text style={styles.title}>EnJoy!</Text>

      <View style={styles.button_area}>

        <View style={styles.button} onTouchEnd={() => {navigation.goBack()}}>
          <Ionicons name="arrow-back" color={"white"} size={30}/>
          <Text style={styles.button_text}>Prev</Text>
        </View>

        <View 
          style={styles.button}
          onTouchEnd={() => {
            navigation.navigate("Login" as never)
          }}
        >
          <Text style={styles.button_text}>Next</Text>
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
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 20,
    backgroundColor: "#182D52",
    paddingHorizontal: 30
  },
  title: {
    color: "white",
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center"
  },
  phrase: {
    color: "white",
    fontFamily: "Ubuntu",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 150,
    minHeight: 40,
    paddingHorizontal: 30,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
  },
  button_text: {
    fontFamily: "Ubuntu",
    color: "white",
    fontSize: 20
  }
})