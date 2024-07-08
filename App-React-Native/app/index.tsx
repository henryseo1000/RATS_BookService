import { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding1 from "./(onboard)/OnBoarding1";
import OnBoarding2 from "./(onboard)/OnBoarding2";
import Login from "./(onboard)/Login";

const Stack = createNativeStackNavigator();

export default function Main(){
    const [hasOnboarded, setHasOnboarded] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('onboarded')
          .then(value => {
            if (value === null) {
              AsyncStorage.setItem('onboarded', 'true');
              setHasOnboarded(true);
            } else {
              setHasOnboarded(true);
            }
          });
      }, []);

    return(
          
        hasOnboarded && (
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="OnBoardingScreen1" component={OnBoarding1} />
            <Stack.Screen options={{headerShown: false}} name="OnBoardingScreen2" component={OnBoarding2} />
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
          </Stack.Navigator>
          )
            
    )
}