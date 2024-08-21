import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SignedIn } from "@clerk/clerk-expo";
import { useConvexAuth } from "convex/react";
import Swiper from 'react-native-swiper'

export default function Onboarding1 () {
  const navigation = useNavigation();
  const { isLoading, isAuthenticated } = useConvexAuth();

  if(isAuthenticated){
    navigation.navigate("(tabs)" as never)
    return;
  }
    
  return (
    <SafeAreaView style={styles.container}>
      
      <Swiper style={styles.swiper}>
        <View style={styles.slide}>
          <View style={styles.inform_area}>

            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.phrase}>Welcome To Mr.Story!</Text>

            <View style={styles.button} onTouchEnd={() => {navigation.navigate("OnBoardingScreen2" as never)}}>
              <Text style={styles.button_text}>Next</Text>
              <Ionicons name="arrow-forward" color={"white"} size={30}/>
            </View>

          </View>
        </View>
      </Swiper>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 20,
    backgroundColor: "#182D52",
  },
  inform_area: {
    width: "100%",
    height: "100%",
    gap: 10,
    backgroundColor: "white"
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
    fontSize: 25
  },
  swiper: {
    height: "30%",
    backgroundColor: "red"
  },
  slide: {
    width: "100%",
    height: "30%",
    paddingHorizontal: 40
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 170,
    height: 50,
    paddingHorizontal: 30,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
  },
  button_text: {
    fontFamily: "Ubuntu",
    color: "white",
    fontSize: 20
  }
})