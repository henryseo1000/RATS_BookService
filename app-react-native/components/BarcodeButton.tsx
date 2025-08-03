import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function BarcodeButton() {
    const navigation = useNavigation();

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.button} 
            >
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('(tabs)' as never);
                    }}
                >
                    <Ionicons name="camera" color={"#ffffff"} size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "7%",
        left: 20,
        bottom: 100
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        aspectRatio: 1,
        boxSizing: "border-box",
        borderWidth: 0.3,
        borderRadius: 50,
        borderColor: "#f1f1f1",
        backgroundColor: "#111111",
        zIndex: 1
    }
})