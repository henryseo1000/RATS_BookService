import { StyleSheet, View, Text } from 'react-native';

export default function Starred() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>This is Starred Page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
      flex: 1, 
      width: "100%", 
      height: "100%", 
      justifyContent: "center", 
      alignItems: "center"
  },
  text : {
      
  }
});
