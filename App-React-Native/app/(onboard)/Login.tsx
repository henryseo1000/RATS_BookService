import { AntDesign, Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


export default function Login(){
    const navigation = useNavigation();
    const [isVisible, setVisible] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.title_area}>
                <Image source={require("../../assets/images/rats-logo.png")} style={styles.logo}/>
                <Text style={styles.title}>SIGN IN</Text>
            </View>

            <View style={styles.input_area}>
                <TextInput placeholder="ID" textContentType={"username"} style={styles.input}/>
                <TextInput placeholder="PASSWORD" textContentType={"password"} secureTextEntry={true} style={styles.input}/>
            </View>

            <TouchableOpacity style={styles.button}>
                <Ionicons name="lock-open" size={20} color={"white"}/>
                <Text style={styles.label}>LOGIN</Text>
            </TouchableOpacity>

            <Text style={{color: "white", marginTop: 10, fontSize: 15, textDecorationLine: "underline"}}
                onPress={() => {}}
                >
                Forgot your password?
            </Text>

            <View style={{width: "80%",flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'white', marginVertical: 30}} />
            </View>

            <View style={styles.sns}>
                <TouchableOpacity style={styles.sns_button}>
                    <AntDesign name="google" size={40} color={"#f1f1f1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sns_button}> 
                    <AntDesign name="apple1" size={40} color={"#f1f1f1"}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sns_button}>
                    <AntDesign name="twitter" size={40} color={"#f1f1f1"}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: "#182D52",
      justifyContent: "center",
      alignItems: "center"
    },
    title_area: {
        width: "100%",
        height: "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo:{
        width: 100,
        height: 100
    },
    title: {
      fontFamily: "Ubuntu",
      fontWeight: "bold",
      color: "white",
      fontSize: 60,
    },
    button: {
      display: "flex",
      flexDirection: "row",
      width: "40%",
      height: "7%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#4787F5",
      borderRadius: 25
    },
    label: {
        fontFamily: "Ubuntu",
        fontWeight: "bold",
        color: "white",
        fontSize: 25,
        margin: 10
    },
    input_area: {
        display: "flex",
        width: "100%",
        height: "21%",

        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%",
        height: "33%",
        backgroundColor: "#f1f1f1",
        borderRadius: 25,
        paddingLeft: 30,
        fontFamily: "Ubuntu",
        fontSize: 20,
        marginBottom: 25,
        color: "#182D52"
    },
    sns: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    sns_button: {
        marginHorizontal: 20
    }
  })