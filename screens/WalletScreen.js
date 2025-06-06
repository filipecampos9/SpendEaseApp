import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const WalletScreen = () => {
      const navigation = useNavigation();


  return (
    <View style={ styles.container }>
        <Text>Username: {auth.currentUser?.displayName}</Text>
        <Text>Wallet Screen</Text>
    </View>
  )
}

export default WalletScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
})