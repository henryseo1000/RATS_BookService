import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IMP from 'iamport-react-native';

export default function SharePage() {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        width: "100%", 
        height: "100%", 
        justifyContent: "center", 
        alignItems: "center"
    }
});