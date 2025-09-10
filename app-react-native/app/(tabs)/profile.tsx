import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {
    const mode = useColorScheme();

    return (
        <SafeAreaView style={styles.container}> 
            <Text>This is Profile Area</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        
    }
})