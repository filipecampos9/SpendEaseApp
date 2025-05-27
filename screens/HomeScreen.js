import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native'; // <-- isto



const HomeScreen = () => {
      const navigation = useNavigation(); // <-- isto
  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    }).catch(error => alert(error.message));
  };



  return (
    <View>
      <View>
        <Text>Home Screen</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})