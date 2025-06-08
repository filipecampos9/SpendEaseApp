import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Image, ImageBackground, SafeAreaView, Platform, StatusBar,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';



const ProfileScreen = () => {
  const navigation = useNavigation();

  const defaultUserImage = require('../assets/default-user.jpg');

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  

  const menuItems = [
    {
    icon: <Ionicons name="wallet-outline" size={20} color="#7b4fff" />,
    label: 'Conta',
    bgColor: '#f2e8ff',
  },
  {
    icon: <Ionicons name="settings-outline" size={20} color="#7b4fff" />,
    label: 'Definições',
    bgColor: '#f2e8ff',
  },
  {
    icon: <Ionicons name="cloud-upload-outline" size={20} color="#7b4fff" />,
    label: 'Exportar Dados',
    bgColor: '#f2e8ff',
  },
  {
    icon: <Ionicons name="log-out-outline" size={20} color="#ff4d4d" />,
    label: 'Terminar Sessão',
    bgColor: '#ffe8e8',
    isLogout: true,
  },
  ];


  return (
    <SafeAreaView style={styles.safeArea}>
      {Platform.OS === 'android' && <View style={styles.statusBarPadding} />}

      <ImageBackground
        source={require('../assets/underCard.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />


      {/* Header */}
      <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.profileText}>Profile</Text>
          <View style={{ width: 24 }} />
      </View>

        <View style={styles.container}>
          <Image
            source={defaultUserImage}
            style={styles.userImage}
          />
          <Text style={styles.usernameText}>{auth.currentUser?.displayName}</Text>

          {/* Lista de opções */}
          <ScrollView style={{ marginTop: 20, paddingHorizontal: 16 }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (item.isLogout) {
                    setLogoutModalVisible(true);
                  } else {
                    // Aqui podes navegar ou chamar funções
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  marginBottom: 12,
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: item.bgColor,
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 14,
                  }}
                >
                  {item.icon}
                </View>
                <Text style={{ fontSize: 16 }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Modal de logout */}
          <Modal
            visible={logoutModalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setLogoutModalVisible(false)}
          >
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
              <View style={{
                backgroundColor: '#fff',
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
                <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
                  Tens a certeza que queres terminar sessão?
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    onPress={() => setLogoutModalVisible(false)}
                    style={{
                      flex: 1,
                      backgroundColor: '#ccc',
                      padding: 12,
                      marginRight: 10,
                      borderRadius: 8
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Não</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={ async () => {
                      try {
                        const auth = getAuth();
                        await signOut(auth);
                        setLogoutModalVisible(false);
                        navigation.navigate('Welcome');
                      } catch (error) {
                        console.error("Error signing out: ", error);
                      }
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#ff4444',
                      padding: 12,
                      borderRadius: 8
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Sim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  statusBarPadding: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 330,
    resizeMode: 'cover',
    zIndex: -1,
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  topBar: {
    marginTop: 80,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#0E3452',
    alignSelf: 'center',
  },
  usernameText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
