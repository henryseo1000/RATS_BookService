import { View, Text, StyleSheet, TouchableOpacity, Button, useColorScheme } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function BarcodePage() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const colorScheme = useColorScheme();

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    if (!permission.granted) {
    // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView 
                style={styles.camera} 
                facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "codabar"],
                }}
                onBarcodeScanned={(result) => {
                    result.data
                }}
            />
                <View style={styles.buttonContainer}>
                    <Ionicons 
                        name="camera-reverse-outline" 
                        color={"#ffffff"} 
                        size={30} 
                        onPress={toggleCameraFacing}
                    />
                    <TouchableOpacity
                        style={styles.shot}
                    />
                    <TouchableOpacity
                        onPress={() => { router.back() }}
                    >
                        <Text style={styles.text}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    camera: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    buttonContainer: {
        position: "absolute",
        flexDirection: "row",
        width: "100%",
        height: "20%",
        bottom: 0,
        padding: 50,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        backdropFilter: "blur"
    },
    text: {
        color: "#ffffff",
        fontSize: 20
    },
    shot: {
        width: 70,
        height: 70,
        backgroundColor: "#ffffff",
        borderWidth: 3,
        borderColor: "#f9f9f9",
        borderRadius: 35
    },
    gallery: {
        width: 40,
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 10
    }
});