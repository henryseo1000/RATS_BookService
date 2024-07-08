import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Onboarding1 () {
  const navigation = useNavigation();
    
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <Text style={styles.phrase}>Welcome To Mr.Story!</Text>
      <View style={styles.button}>
        <Button title="Next" onPress={() => {navigation.navigate("OnBoardingScreen2" as never)}} color={"white"}/>
        <Ionicons name="arrow-forward" color={"white"} size={30}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "#182D52",
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 30
  },
  title: {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    color: "white",
    fontSize: 50
  },
  phrase: {
    fontFamily: "Ubuntu",
    color: "white",
    fontSize: 30
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white"
  }
})