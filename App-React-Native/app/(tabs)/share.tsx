import { StyleSheet, View, Text } from "react-native";

export default function SharePage() {
    return (
        <View style={styles.container}>
            <Text>This is Share Page.</Text>
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
    }
});