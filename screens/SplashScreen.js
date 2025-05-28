import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        navigation.replace('Main');
      } else {
        navigation.replace('Welcome');
      }
    }, 3000);

    return () => clearTimeout(timer); // limpa o timer se o componente desmontar antes dos 3s
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoTest.png')} style={styles.logo} />
      <Text style={styles.appName}>SpendEase</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E3452',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;