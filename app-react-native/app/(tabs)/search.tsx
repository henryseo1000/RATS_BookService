import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function SearchPage() {
    const router = useRouter();

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.text}
            >
                this is search page.
            </Text>
            <TouchableOpacity
                onPress={() => {
                    router.back()
                }}
            >
                <Text
                    style={styles.button}
                >
                    Go Back
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    text : {
        color: "#ffffff"
    },
    button : {
        color: "#ffffff"
    }
})