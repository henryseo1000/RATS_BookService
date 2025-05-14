import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function BarcodeButton() {
    return (
        <View>
            <TouchableOpacity 
                style={styles.container} 
                onPress={() => {

                }}
            >
                <Ionicons name="barcode" color={"#ffffff"} size={35}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        bottom: 50,
        borderRadius: 75,
        backgroundColor: "#182D52",
        zIndex: 4
    }
})