import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { HelloWave } from '@/components/HelloWave';


SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>
          SplashScreen Demo!
          <HelloWave size={20} lineHeight={0} marginTop={0}/>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    display: "flex",
  },
  scroll : {
    display: "flex",
    height: "100%",
    padding: 30
  },
  text : {
      fontSize: 20,
      fontFamily: "Ubuntu",
      flex: 1,
      justifyContent: "center",
      alignContent: "center"
  }
});
