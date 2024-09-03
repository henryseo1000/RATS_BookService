import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Image source={require("../../assets/images/logo_mr_story.png")}
                    style={styles.image}
                />
                <View style={styles.icons}>
                    <Ionicons name="barcode" size={20} color={"#182D52"} style={styles.icon} onPress={() => {}}/>
                    <Ionicons name="search" size={20} color={"#182D52"} style={styles.icon} onPress={() => {}}/>
                    <Ionicons name="settings" size={20} color={"#182D52"} style={styles.icon} onPress={() => {}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "white"
    },
    container : {
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