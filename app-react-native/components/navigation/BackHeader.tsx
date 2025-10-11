import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react'
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'

interface HeaderProps {
    needSettings? : boolean,
    pageName?: string
}

export default function BackHeader({ needSettings = true, pageName } : HeaderProps) {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={colorScheme === "dark" ? styles.wrapper_dark : styles.wrapper_light}>
            <View style={colorScheme === "dark" ? styles.container_dark : styles.container_light}>
                <Ionicons 
                    name="arrow-back" 
                    size={20} 
                    color={colorScheme === "dark" ? "#ffffff" : "#182D52"} 
                    style={styles.icon} 
                    onPress={() => {
                        router.back();
                    }}
                />

                <Text style={styles.page_title}>
                    {pageName}
                </Text>
                
                {   needSettings ?
                    <Ionicons 
                        name="settings" 
                        color={colorScheme === "dark" ? "#ffffff" : "#182D52"} 
                        style={styles.icon} 
                        onPress={() => {

                        }}
                    />
                    :
                    <View style={styles.icon}/>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper_light: {
        backgroundColor: "#ffffff"
    },
    wrapper_dark: {
        backgroundColor: "#212121"
    },
    container_dark: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 60,
        paddingHorizontal: 30,
        boxSizing: "border-box",
        backgroundColor: "#212121",
        borderBottomWidth: 0.5,
        borderColor: "#333333",
    },
    container_light: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 60,
        paddingHorizontal: 30,
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        borderBottomWidth: 0.5,
        borderColor: "#eeeeee",
    },
    icon : {
        width: 20
    },
    page_title: {
        fontSize: 20,
        fontWeight: "bold"
    }
})