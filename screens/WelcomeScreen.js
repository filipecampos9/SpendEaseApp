import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/bgOverlay.png')}
        style={styles.pattern}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Image
          source={require('../assets/man.png')} 
          style={styles.manImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>Smarter Spending {'\n'} Starts Here</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signupButtonWrapper}>
            <LinearGradient
                colors={['#0E3452', '#1C5888']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.signupButton}
            >
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pattern: {
    ...StyleSheet.absoluteFillObject, // cobre toda a tela
    width: width * 1,
    height: width * 1.4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  manImage: {
    width: width * 1,
    height: width * 1,
    marginBottom: 30,
    marginTop: 100,
  },
  title: {
    fontSize: 38,
    color: '#0E3452',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  signupButtonWrapper: {
    width: '90%',
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  signupButton: {
    padding: 13,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: '#C2D0DA',
    padding: 13,
    borderRadius: 10,
    marginVertical: 5,
    width: '90%',
    alignItems: 'center',
  },
  buttonOutlineText: {
    color: '#0E3452',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
