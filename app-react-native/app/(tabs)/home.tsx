import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

  return (
    <View>

      <ScrollView style={styles.container}>
        <Text style={styles.text}>
          SplashScreen Demo!

        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
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
