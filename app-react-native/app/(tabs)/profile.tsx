import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "@/components/navigation/BackHeader";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
    const userInfo = useUser();
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={colorScheme === "dark" ? styles.container_dark : styles.container_light}> 
            <BackHeader needSettings={false} pageName="프로필 편집"/>

            <ScrollView style={colorScheme === "dark" ? styles.user_information_area_dark : styles.user_information_area_light}>
                <View style={styles.image_area}>
                    <Image width={150} height={150} borderRadius={75} source={{uri : userInfo.user?.imageUrl}}/>
                    <TouchableOpacity style={styles.name_area}>
                        <Text style={styles.profile_text}>{userInfo.user?.username}</Text>
                        <Ionicons name="pencil-outline" size={15} color={colorScheme === "dark" ? "#8C8C8C" : "#182D52"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.name_area}>
                        <Text style={styles.id_text}>학번 : 12345678</Text>
                        <Ionicons name="pencil-outline" size={15} color={colorScheme === "dark" ? "#8C8C8C" : "#1f1f1f"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.input_area}>
                    <TextInput style={styles.input}/>
                    <TextInput style={styles.input}/>
                    <TextInput style={styles.input}/>
                </View>
            </ScrollView>

            <View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container_dark: {
        height: "100%",
        backgroundColor: "#212121"
    },
    container_light: {
        height: "100%",
        backgroundColor: "#ffffff"
    },
    user_information_area_dark: {
        flex: 1,
        height: "auto",
        paddingVertical: 45,
        backgroundColor: "#000000"
    },
    user_information_area_light: {
        flex: 1,
        height: "auto",
        paddingVertical: 45,
        backgroundColor: "#f1f1f1"
    },
    image_area: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10%",
        gap: 15
    },
    profile_text: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"
    },
    id_text: {
        color: "white",
        fontSize: 20
    },
    name_area: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
        gap: 5
    },
    input_area: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        gap: 20
    },
    input: {
        width: "100%",
        backgroundColor: "white"
    }
})