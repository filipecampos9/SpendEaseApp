import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // <-- isto
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';




const SignUpScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const navigation = useNavigation(); 
    const [isChecked, setIsChecked] = useState(false);

    const handleSignUp = () => {
    if (!isChecked) {
        alert('Por favor, aceite os termos e condições para continuar.');
        return;
    }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async userCredentials => {
            const user = userCredentials.user;

            await updateProfile(user, {
                displayName: username, // Atualiza o nome de utilizador
            });

            console.log('Registered with:', user.email, 'and username:', username);
            navigation.replace('Home');  // Navega para Home após registo
        })
        .catch(error => alert(error.message));
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
        </View>

        {/* CONTEÚDO CENTRALIZADO */}
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Username'
              value={username}
              onChangeText={text => setUsername(text)}
              style={styles.input}
            />

            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />

            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <View style={styles.section}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#0E3452' : undefined}
            />
            <Text style={styles.terms}>
              By signing up, you agree to the Terms of Service and Privacy Policy
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignUp} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#0E3452', '#1C5888']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.label, styles.underline, { color: '#0E3452', fontWeight: 'bold' }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 50,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        width: '100%',
    },
    inputContainer: {
        width: '90%',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ececec',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 20,
        fontSize: 15,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginTop: 10,
    },
    checkbox: {
        marginRight: 0,
    },
    terms: {
        fontSize: 16,
        color: '#8d8d8d',
        marginLeft: 10,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0E3452',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonWrapper: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        color: '#8d8d8d',
        textAlign: 'center',
        marginTop: 10,
        marginRight: 10,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    header: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 20,
    },
    backButton: {
      position: 'absolute',
      left: 20,
    },
    headerTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
    },
 
});

export default SignUpScreen;