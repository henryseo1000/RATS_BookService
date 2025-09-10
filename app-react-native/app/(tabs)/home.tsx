import { View, StyleSheet, Text, ScrollView, useColorScheme, TouchableOpacity, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import Swiper from 'react-native-swiper';


SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const mode = useColorScheme();
  const navigation = useNavigation();
  const userInfo = useUser();

  return (
      <ScrollView style={styles.scroll}>
        <View style={styles.inner_view}>
          <TouchableOpacity 
            style={mode === 'light' ? styles.profile_area : styles.profile_area_dark}
            onPress={() => { navigation.navigate("profile" as never) }}
          >
            <Image width={40} height={40} borderRadius={20} source={{uri : userInfo.user?.imageUrl}}/>
            <View style={styles.profile_main}>
              <View style={styles.profile_title}>
                <Text style={styles.user_greetings}>안녕하세요, {userInfo.user?.username}님!</Text>
                <Ionicons name="arrow-forward-outline" color="#ffffff" size={20}></Ionicons>
              </View>

              <Text style={styles.description}>오늘도 책과 함께 즐거운 시간 되시길 바랄게요!</Text>
            </View>
          </TouchableOpacity>


          <Swiper
            height={150}
            paginationStyle={{
              bottom: "10%",
            }}
          >
            <View style={mode === 'light' ? styles.event_swiper : styles.event_swiper_dark}>
              <Text>Swiper Area1</Text>
            </View>
            <View style={mode === 'light' ? styles.event_swiper : styles.event_swiper_dark}>
              <Text>Swiper Area2</Text>
            </View>
            <View style={mode === 'light' ? styles.event_swiper : styles.event_swiper_dark}>
              <Text>Swiper Area3</Text>
            </View>
          </Swiper>

            
          <View
            style={mode === 'light' ? styles.event_swiper : styles.event_swiper_dark}
          >
            <Text>Text</Text>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll : {
    height: "100%",
    padding: 30,
    boxSizing: "border-box",
  },
  inner_view:{
    flex: 1,
    gap: 30
  },
  text : {
    fontSize: 20,
    fontFamily: "Ubuntu",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  profile_area : {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#182D52",
    padding: 20,
    boxSizing: "border-box",
    gap: 10,
    borderRadius: 20,
  },
  profile_area_dark : {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#212121",
    padding: 20,
    boxSizing: "border-box",
    gap: 10,
    borderRadius: 20,
  },
  profile_main: {
    flex: 1,
    gap: 10
  },
  profile_title : {
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  user_greetings : {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  },
  description : {
    color: "#ffffff"
  },
  event_swiper_dark : {
    height: 150,
    backgroundColor: "#212121",
    padding: 20,
    boxSizing: "border-box",
    gap: 10,
    borderRadius: 20,
  },
  event_swiper : {
    height: 150,
    backgroundColor: "#212121",
    padding: 20,
    boxSizing: "border-box",
    gap: 10,
    borderRadius: 20,
  }
});
