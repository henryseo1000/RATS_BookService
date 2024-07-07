import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo_mr_story.png")}
                style={styles.image}
            />
            <View style={styles.icons}>
                <Ionicons name="barcode" size={20} style={styles.icon}/>
                <Ionicons name="search" size={20} style={styles.icon}/>
                <Ionicons name="settings" size={20} style={styles.icon}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flexDirection: "row",
        width: "100%",
        height: 90,
        backgroundColor: "#ffffff",
        shadowColor: "#f1f1f1",
        shadowOffset: {
            width: 100,
            height: 100
        },
        justifyContent: "space-between",
        alignContent: "center",
        paddingHorizontal: 20
    },
    icons : {
        display: "flex",
        flexDirection: "row",
        top: 55
    },
    icon:{
        marginLeft: 15
    },
    image: {
        top: 55,
        width : 90,
        height : 20,
    }
  });