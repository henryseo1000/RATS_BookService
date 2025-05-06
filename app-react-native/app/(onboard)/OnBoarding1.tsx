import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useConvexAuth } from "convex/react";
import Swiper from 'react-native-swiper'
import Feather from '@expo/vector-icons/Feather';

export default function Onboarding1 () {
  const navigation = useNavigation();
  const { isAuthenticated } = useConvexAuth();

  const onboardData = [
    {
      icon: <Feather style={styles.icon} name="book-open" size={100} color="white" />,
      main: "Safe and Easy",
      phrase: "Mr.Story is easy to use. Your books are safely stored in database.",
      imgPath: require("../../assets/images/onBoardImage1.png")
    },
    {
      icon: <Feather style={styles.icon} name="search" size={100} color="white" />,
      main: "Easily Find",
      phrase: "You can find book more easily with Mr.Story.",
      imgPath: require("../../assets/images/onBoardImage2.png")
    },
    {
      icon: <Feather style={styles.icon} name="star" size={100} color="white" />,
      main: "Bookmarks",
      phrase: "Bookmark your favorite books! This is fun!",
      imgPath: require("../../assets/images/onBoardImage3.png")
    },
  ];

  if(isAuthenticated){
    navigation.navigate("(tabs)" as never);
    return;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Swiper 
        paginationStyle={{
          bottom: "1%"
        }}
      >
        {onboardData.map((item, index) => {

          return(
            <View style={styles.slide} key={index}>
              {item?.icon}

              <Image style={styles.image} source={item?.imgPath}/>

              <View style={styles.inform_area}>
                <View style={styles.title}> 
                  <Text style={styles.main}>{item?.main}</Text>
                  <Text style={styles.phrase}>{item?.phrase}</Text>
                </View>

                <View style={styles.button} onTouchEnd={() => {navigation.navigate("OnBoardingScreen2" as never)}}>
                  <Text style={styles.button_text}>Next</Text>
                  <Ionicons name="arrow-forward" color={"white"} size={20}/>
                </View>
              </View>
            </View>
        )
        })}
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#182D52"
  },
  image: {
    display: "flex",
    width: "100%",
    height: "70%",
  },
  icon: {
    position: "absolute",
    left: 20,
    bottom: "25%",
    zIndex: 1
  },
  inform_area: {
    display: "flex",
    width: "100%",
    gap: 25,
    paddingVertical: 40,
    paddingHorizontal: 35,
  },
  title: {
    gap: 5
  },
  main: {
    fontFamily: "Ubuntu",
    fontWeight: "700",
    color: "white",
    fontSize: 40
  },
  phrase: {
    fontFamily: "Ubuntu",
    fontWeight: "100",
    color: "white",
    fontSize: 20
  },
  slide: {
    width: "100%",
    height: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 150,
    minHeight: 40,
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