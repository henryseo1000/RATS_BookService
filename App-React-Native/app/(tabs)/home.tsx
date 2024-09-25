import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Header from '@/components/navigation/Header';
import { HelloWave } from '@/components/HelloWave';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {

  return (
    <View>
      <ScrollView style={styles.container}>
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
