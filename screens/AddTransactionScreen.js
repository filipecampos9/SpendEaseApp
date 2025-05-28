import { StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const AddTransactionScreen = () => {
      const navigation = useNavigation();


  return (
    <View style={ styles.container }>
        <Text>Username: {auth.currentUser?.displayName}</Text>
        <Text>Add Transaction Screen</Text>
    </View>
  )
}

export default AddTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
})