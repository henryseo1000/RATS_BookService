import { View, Text,StyleSheet } from "react-native";

export default function MyBookPage() {
    return (
        <View style={styles.container}>
            <Text style = {styles.text}>This is Book Page.</Text>
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
        
    }
});