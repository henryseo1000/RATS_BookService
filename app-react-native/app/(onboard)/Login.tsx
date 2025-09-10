import { useUserInfoStore } from "@/store/UserInfo";
import { useClerk, useSignIn } from "@clerk/clerk-expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import FindPasswordPage from "./FindPassword";


export default function Login(){
    const navigation = useNavigation();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const { signIn, setActive } = useSignIn();
    const { username, setUsername, password, setPassword } = useUserInfoStore();

    const [ isError, setError ] = useState(false);

    const onSignInPress = useCallback(async () => {
        try {
            const signInAttempt = await signIn?.create({
                identifier: username,
                password,
            });

            if (signInAttempt?.status === 'complete' && setActive) {
                await setActive({ session: signInAttempt.createdSessionId })
                .then(() => navigation.navigate("(tabs)" as never));
                return;
            } else {
                setError(true);
                return;
            }
        } catch (err: any) {
            setError(true);
        }
    }, [isLoading, isAuthenticated, username, password]);

   if (isAuthenticated && !isLoading) {
        navigation.navigate("(tabs)" as never);
        return;
    }

    return (
        <>
        {   isLoading &&
            <View style={styles.loading_screen}>
                <Text>Loading...</Text>
            </View>
        }
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

                    <TouchableOpacity style={styles.button} onPress={() => onSignInPress()}>
                        <Ionicons name="lock-open" size={20} color={"white"}/>
                        <Text style={styles.login_text}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inform}>
                    <Text style={{color: "white", marginTop: 10, fontSize: 15, textDecorationLine: "underline"}}
                        onPress={() => { navigation.navigate("FindPasswordPage" as never) }}
                    >
                        Forgot your password?
                    </Text>
                    { isError && (
                        <View style={styles.error}>
                            <AntDesign name="exclamationcircle" size={0} color="red" />
                            <Text>Error in your input. Please check your ID and password.</Text>
                        </View>
                    )}
                </View>

                <View style={{width: "80%",flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                </View>

                <View style={styles.sns}>
                    <TouchableOpacity>
                        <AntDesign name="google" size={30} color={"#f1f1f1"}/>
                    </TouchableOpacity>
                    <TouchableOpacity> 
                        <AntDesign name="apple1" size={30} color={"#f1f1f1"}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="facebook-square" size={30} color={"#f1f1f1"}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    loading_screen: {
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 30,
        backgroundColor: '#182D52'
    },
    title_area: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height : 150
    },
    title: {
        color: '#ffffff',
        fontFamily: 'Ubuntu',
        fontSize: 50,
    },
    input_area: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        gap: 30
    },
    input: {
        width: '100%',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        fontFamily: 'Ubuntu',
        fontSize: 20
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 40,
        gap: 10,
        borderRadius: 20,
        backgroundColor: '#4787F5'
    },
    login_text: {
        fontFamily: 'Ubuntu',
        fontSize: 20,
        color: "#ffffff"
    },
    inform: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 15
    },
    error: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '60%',
        gap: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#DC7D75'
    },
    sns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        gap: 70,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
  })