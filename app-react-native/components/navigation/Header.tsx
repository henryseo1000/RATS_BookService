import { Image, SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function Header() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={colorScheme === "dark" ? styles.wrapper_dark : styles.wrapper_light}>
            <View style={colorScheme === "dark" ? styles.container_dark : styles.container_light}>
                <Image source={colorScheme === "dark" ? require("../../assets/images/logo_mr_story_dark.png") : require("../../assets/images/logo_mr_story.png")}
                    style={styles.image}
                />
                <View style={styles.icons}>
                    <Ionicons 
                        name="barcode" 
                        size={20} 
                        color={colorScheme === "dark" ? "#ffffff" : "#182D52"} 
                        style={styles.icon} 
                        onPress={() => {
                            navigation.navigate('barcode' as never)
                        }}
                    />
                    <Ionicons 
                        name="search" 
                        size={20} 
                        color={colorScheme === "dark" ? "#ffffff" : "#182D52"} 
                        style={styles.icon} 
                        onPress={() => {
                            navigation.navigate('search' as never)
                        }}
                    />
                    <Ionicons name="settings" size={20} color={colorScheme === "dark" ? "#ffffff" : "#182D52"} style={styles.icon} onPress={() => {}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper_light: {
        backgroundColor: "#ffffff"
    },
    wrapper_dark: {
        backgroundColor: "#111111"
    },
    container_light : {
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#ffffff",
        shadowColor: "#f1f1f1",
        shadowOffset: {
            width: 100,
            height: 100
        },
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30
    },
    container_dark : {
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#111111",
        shadowColor: "#f1f1f1",
        shadowOffset: {
            width: 100,
            height: 100
        },
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30
    },
    icons : {
        display: "flex",
        flexDirection: "row",
    },
    icon:{
        marginLeft: 15
    },
    image: {
        width : 90,
        height : 20,
    }
  });