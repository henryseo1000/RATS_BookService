import {useAuth, useSignIn } from "@clerk/clerk-expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { Redirect, useNavigation, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"


export default function Login(){
    const navigation = useNavigation();
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { signIn, setActive } = useSignIn();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setError] = useState(false);

  const onSignInPress = useCallback(async () => {

    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId }).then(() => navigation.navigate("(tabs)" as never));
        return;
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        setError(true);
        return;
      }
    } catch (err: any) {
      setError(true);
    }
  }, [isLoading, username, password]);

    if (isLoading) {
        return (
        <View>
            
        </View>
        );
    }

    else if (isAuthenticated) {
        navigation.navigate("(tabs)" as never);
        return;
    }

    else{
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.title_area}>
                <Image source={require("../../assets/images/rats-logo.png")} style={styles.logo}/>
                <Text style={styles.title}>SIGN IN</Text>
            </View>

            <View style={styles.input_area}>
                <TextInput 
                    placeholder="ID" 
                    textContentType={"username"} 
                    value={username} 
                    style={styles.input}
                    onChangeText={(username) => setUsername(username)}
                    />

                <TextInput 
                    placeholder="PASSWORD" 
                    textContentType={"password"} 
                    value={password} 
                    secureTextEntry={true} 
                    style={styles.input}
                    onChangeText={(password) => setPassword(password)}
                    />

                <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                    <Ionicons name="lock-open" size={20} color={"white"}/>
                    <Text style={styles.label}>LOGIN</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inform}>
                <Text style={{color: "white", marginTop: 10, fontSize: 15, textDecorationLine: "underline"}}
                    onPress={() => {navigation.navigate("(tabs)" as never)}}
                    >
                    Forgot your password?
                </Text>
                { isError && (
                    <Text style={styles.error}>
                        <AntDesign name="exclamationcircle" size={0} color="red" />
                        Error in your input. Please check your ID and password.
                    </Text>
                )}
            </View>

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
                    <AntDesign name="facebook-square" size={40} color={"#f1f1f1"}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    }
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
        height: "20%",
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
      height: "25%",
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
        height: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%",
        height: "25%",
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
    },
    error : {
        color: "red",
        fontSize: 20,
        fontFamily: "ubuntu",
        textAlign: "center",
        marginTop: 10,
        backgroundColor: "#DB8570",
        justifyContent : "center",
        alignItems: "center",
        padding: 5,
    },
    inform: {
        display: "flex",
        width: "60%",
        justifyContent : "center",
        alignItems: "center"
    }
  })